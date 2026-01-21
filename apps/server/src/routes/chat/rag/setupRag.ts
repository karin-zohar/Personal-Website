import fs from "fs";
import path from "path";
import { openai } from "../../../lib/openai.js";
import { RAG } from "../../../config/rag.js";

type VectorStore = Awaited<ReturnType<typeof openai.vectorStores.create>>;
const DATA_DIR = path.join(process.cwd(), "src", "data", "rag");
const ALLOWED_EXT = [".txt", ".md", ".pdf"];

export const setupRag = async () => {
  let vectorStoreId = RAG.vectorStoreId;
  let vectorStore: VectorStore;

  if (!vectorStoreId) {
    vectorStore = await openai.vectorStores.create({
      name: "Karin Profile",
    });
    vectorStoreId = vectorStore.id;
  }

  const files = fs.readdirSync(DATA_DIR);

  const fileStreams = files.flatMap((filename) => {
    const filePath = path.join(DATA_DIR, filename);

    // Skip folders and include only files with allowed extensions.
    const isValidFile =
      fs.statSync(filePath).isFile() &&
      ALLOWED_EXT.includes(path.extname(filename));

    return isValidFile ? [fs.createReadStream(filePath)] : [];
  });

  await openai.vectorStores.fileBatches.uploadAndPoll(vectorStoreId, {
    files: fileStreams,
  });
  console.log("✅ All files uploaded and processed");

  // Retrieve final state
  vectorStore = await openai.vectorStores.retrieve(vectorStoreId);

  console.log(
    `📁 Vector store ready with ${vectorStore.file_counts.completed} files`,
  );
  console.log("🎉 Vector store ID:", vectorStore.id);

  return vectorStore;
};

setupRag().catch(console.error);
