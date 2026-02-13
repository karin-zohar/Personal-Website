import { ReactNode } from "react";
import { StateCreator } from "zustand";

const LANGUAGE_LOCAL_STORAGE_KEY = "languages";
const VALID_LANGUAGES = ["english", "hebrew"] as const;

type Language = (typeof VALID_LANGUAGES)[number];
export type Dictionary = Record<Language, ReactNode>;

export type I18nSlice = {
  language: Language;
  setLanguage: (language: Language) => void;
  getLocalizedText: (dictionary: Dictionary) => ReactNode;
};

const getStoredLanguage = (): Language => {
  const stored = localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY);
  if (stored && VALID_LANGUAGES.includes(stored as Language)) {
    return stored as Language;
  }
  return "english";
};

export const i18nSlice: StateCreator<I18nSlice> = (set, get) => {
  const initialLanguage = getStoredLanguage();

  return {
    language: initialLanguage,
    setLanguage: (language: Language) => {
      set({ language });
      try {
        localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, language);
      } catch (error) {
        console.error("Failed to save language to localStorage:", error);
      }
    },
    getLocalizedText: (dictionary: Dictionary) => {
      const selectedLanguage = get().language;
      return dictionary[selectedLanguage];
    },
  };
};
