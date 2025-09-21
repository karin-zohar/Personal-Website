import { create } from "zustand";
import { themeSlice, ThemeSlice } from "./slices/theme.slice";
import { i18nSlice, I18nSlice } from "./slices/i18n.slice";

type Store = ThemeSlice & I18nSlice;

const useStore = create<Store>((...slices) => ({
  ...themeSlice(...slices),
  ...i18nSlice(...slices),
}));

export default useStore;
