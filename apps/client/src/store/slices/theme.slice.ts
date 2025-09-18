import { StateCreator } from "zustand";

export type ThemeSlice = {
    isLightTheme: boolean;
    toggleTheme: () => void;
}

export const themeSlice: StateCreator<ThemeSlice> = (set, get) => ({
    isLightTheme: true,
    toggleTheme: () => {
        const currentTheme = get().isLightTheme
        set({ isLightTheme: !currentTheme })
    }
})