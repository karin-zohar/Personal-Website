import "dotenv/config";

export const RAG = {
  get vectorStoreId() {
    if (!process.env.KARIN_VECTOR_STORE_ID) {
      return undefined;
    }
    return process.env.KARIN_VECTOR_STORE_ID;
  },
};
