import { create } from "zustand";
import { themeSlice, ThemeSlice } from "./slices/theme.slice";
import { i18nSlice, I18nSlice } from "./slices/i18n.slice";
import { SectionSlice, sectionSlice } from "./slices/SectionSlice";

type Store = ThemeSlice & I18nSlice & SectionSlice;

const useStore = create<Store>((...slices) => ({
  ...themeSlice(...slices),
  ...i18nSlice(...slices),
  ...sectionSlice(...slices),
}));

export default useStore;
