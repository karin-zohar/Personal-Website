import { create } from 'zustand';
import { themeSlice, ThemeSlice } from './slices/theme.slice';


type Store = ThemeSlice;

const useStore = create<Store>((...slices) => ({
    ...themeSlice(...slices),
}));

export default useStore;
