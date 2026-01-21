import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This exports the absolute path to this specific folder
export const RAG_DATA_PATH = __dirname;

export const profile = path.resolve("./", "karin-profile.md");
export const cv = path.resolve("./", "Karin Zohar - CV.pdf");
