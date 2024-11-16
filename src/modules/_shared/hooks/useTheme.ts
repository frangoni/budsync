import appTheme from '../appTheme';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setAppThemeMode, ThemeMode, toggleTheme } from '@/redux/reducers/theme';
import { useEffect } from 'react';

const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
function getThemeModeFromDeviceTheme(matchesDarkTheme: boolean) {
	return matchesDarkTheme ? 'dark' : 'light';
}

export function useTheme() {
	const themeMode = useAppSelector(({ theme }) => theme.themeMode);
	const theme = useAppSelector(({ theme }) => theme.theme);
	const dispatch = useAppDispatch();

	useEffect(() => {
		prefersDarkTheme.addEventListener('change', event =>
			dispatch(setAppThemeMode(getThemeModeFromDeviceTheme(event.matches)))
		);
	}, []);
	const toggleAppTheme = () => dispatch(toggleTheme());
	const setThemeMode = (themeMode: ThemeMode) => dispatch(setAppThemeMode(themeMode));

	return {
		themeMode,
		theme: appTheme[theme],
		isDark: theme !== 'light',
		isLight: theme !== 'dark',
		toggleTheme: toggleAppTheme,
		setThemeMode,
	};
}
