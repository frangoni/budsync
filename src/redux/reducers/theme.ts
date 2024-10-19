import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
	theme: Theme;
}
export type Theme = 'light' | 'dark';

const initialState: ThemeState = {
	theme: 'light',
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: state => {
			const currentTheme = state.theme;
			state.theme = currentTheme === 'light' ? 'dark' : 'light';
		},
		setTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload;
		},
	},
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
