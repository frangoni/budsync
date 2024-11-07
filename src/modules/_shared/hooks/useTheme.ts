import appTheme from '../appTheme';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { toggleTheme } from '@/redux/reducers/theme';
import { useEffect, useState } from 'react';

const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');

function getThemeModeFromDeviceTheme(matchesDarkTheme: boolean) {
	return matchesDarkTheme ? 'dark' : 'light';
}

export function useTheme() {
	const [deviceTheme, setDeviceTheme] = useState<'light' | 'dark'>(() =>
		getThemeModeFromDeviceTheme(prefersDarkTheme.matches)
	);
	const themeMode = useAppSelector(({ theme }) => theme.theme);
	const dispatch = useAppDispatch();

	const colors = appTheme[deviceTheme];

	useEffect(() => {
		prefersDarkTheme.addEventListener('change', event =>
			setDeviceTheme(getThemeModeFromDeviceTheme(event.matches))
		);
	}, []);
	const toggleAppTheme = () => dispatch(toggleTheme());

	return {
		themeMode,
		theme: appTheme[themeMode],
		isDark: themeMode !== 'light',
		isLight: themeMode !== 'dark',
		toggleTheme: toggleAppTheme,
	};
}
