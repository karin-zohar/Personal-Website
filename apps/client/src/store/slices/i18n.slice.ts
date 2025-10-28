import { ReactNode } from "react";
import { StateCreator } from "zustand";

type Language = "english" | "hebrew";
export type Dictionary = Record<Language, ReactNode>;

export type I18nSlice = {
  language: Language;
  setLanguage: (language: Language) => void;
  getLocalizedText: (dictionary: Dictionary) => ReactNode;
};

export const i18nSlice: StateCreator<I18nSlice> = (set, get) => ({
  language: "english",
  setLanguage: (language: Language) => {
    set({ language });
  },
  getLocalizedText: (dictionary: Dictionary) => {
    const selectedLanguage = get().language;
    return dictionary[selectedLanguage];
  },
});
