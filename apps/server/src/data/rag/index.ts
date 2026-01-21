import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This exports the absolute path to this specific folder
export const RAG_DATA_PATH = __dirname;
