import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
	theme: Theme;
	themeMode: Theme | 'device';
}
export type Theme = 'light' | 'dark';
export type ThemeMode = Theme | 'device';

const initialState: ThemeState = {
	theme: 'light',
	themeMode: 'device',
};

const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
function getThemeModeFromDeviceTheme(matchesDarkTheme: boolean) {
	return matchesDarkTheme ? 'dark' : 'light';
}

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: state => {
			const currentTheme = state.theme;
			state.theme = currentTheme === 'light' ? 'dark' : 'light';
			state.themeMode = state.theme;
		},
		setAppThemeMode: (state, action: PayloadAction<ThemeMode>) => {
			const deviceTheme = getThemeModeFromDeviceTheme(prefersDarkTheme.matches);
			const newThemeMode = action.payload;
			const newTheme = newThemeMode === 'device' ? deviceTheme : newThemeMode;
			state.themeMode = action.payload;
			state.theme = newTheme;
		},
	},
});

export const { toggleTheme, setAppThemeMode } = themeSlice.actions;

export default themeSlice.reducer;
