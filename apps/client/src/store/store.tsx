import { create } from "zustand";
import { themeSlice, ThemeSlice } from "./slices/theme.slice";
import { i18nSlice, I18nSlice } from "./slices/i18n.slice";
import { NavigationSlice, navigationSlice } from "./slices/navigationSlice";

type Store = ThemeSlice & I18nSlice & NavigationSlice;

const useStore = create<Store>((...slices) => ({
  ...themeSlice(...slices),
  ...i18nSlice(...slices),
  ...navigationSlice(...slices),
}));

export default useStore;
