import fs from "fs";
import path from "path";
import { openai } from "../../../lib/openai.js";
import { RAG } from "../../../config/rag.js";

const DATA_DIR = "src/data/rag";
const ALLOWED_EXT = [".txt", ".md", ".pdf"];

export const setupRag = async () => {
  let vectorStoreId = RAG.vectorStoreId;
  let vectorStore: Awaited<ReturnType<typeof openai.vectorStores.create>>;

  vectorStore = await openai.vectorStores.create({
    name: "Karin Profile",
  });
  vectorStoreId = vectorStore.id;

  const files = fs.readdirSync(DATA_DIR);
  const uploads = files
    .filter((filename) => {
      // Skip folders and include only files with allowed extensions.
      const filePath = path.join(DATA_DIR, filename);
      return (
        fs.statSync(filePath).isFile() &&
        ALLOWED_EXT.includes(path.extname(filename))
      );
    })
    .map(async (filename) => {
      const filePath = path.join(DATA_DIR, filename);
      const uploadedFile = await openai.files.create({
        file: fs.createReadStream(filePath),
        purpose: "assistants",
      });

      await openai.vectorStores.files.create(vectorStore.id, {
        file_id: uploadedFile.id,
      });
      console.log(`✅ Indexed ${filename}`);
    });

  await Promise.all(uploads);
  console.log("📤 Files uploaded, waiting for processing...");

  // Poll until all files are processed
  let attempts = 0;
  const maxAttempts = 60; // 60 seconds max

  while (attempts < maxAttempts) {
    const currentStore = await openai.vectorStores.retrieve(vectorStoreId);

    console.log(
      `⏳ Status: ${currentStore.file_counts.completed} completed, ${currentStore.file_counts.in_progress} in progress, ${currentStore.file_counts.failed} failed`,
    );

    if (currentStore.file_counts.in_progress === 0) {
      vectorStore = currentStore;
      if (currentStore.file_counts.completed > 0) {
        console.log(
          `✅ All ${currentStore.file_counts.completed} files processed successfully`,
        );
        break;
      } else if (currentStore.file_counts.failed > 0) {
        console.error(
          `❌ ${currentStore.file_counts.failed} files failed to process`,
        );
        break;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
    attempts++;
  }

  if (attempts >= maxAttempts) {
    console.warn("⚠️ Timeout waiting for file processing");
  }

  // List all files in the vector store for debugging
  const filesInStore = await openai.vectorStores.files.list(vectorStoreId);
  console.log(`📁 Files in vector store: ${filesInStore.data.length}`);
  for (const file of filesInStore.data) {
    console.log(`  - File ID: ${file.id}, Status: ${file.status}`);
  }

  console.log("🎉 Vector store ready:", vectorStore.id);
  return vectorStore;
};

setupRag().catch(console.error);
