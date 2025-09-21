import { StateCreator } from "zustand";

type Language = "english" | "hebrew";
export type I18nSlice = {
  language: Language;
  setLanguage: (language: Language) => void;
};

export const i18nSlice: StateCreator<I18nSlice> = (set) => ({
  language: "english",
  setLanguage: (language: Language) => {
    set({ language });
  },
});
