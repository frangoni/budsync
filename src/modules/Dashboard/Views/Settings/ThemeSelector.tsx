import AppButton from '@/modules/_shared/components/Button';
import { useTheme } from '@/modules/_shared/hooks/useTheme';
import { Button } from 'antd';

export default function ThemeSelector() {
	const { setThemeMode, themeMode } = useTheme();
	const getVariantByTheme = (themeValue: string) => (themeValue === themeMode ? 'primary' : 'secondary');

	return (
		<>
			<h4>Select the App's theme</h4>
			<div className='spacer-24' />
			<Button.Group>
				<AppButton buttonType={getVariantByTheme('dark')} text='Dark' onClick={() => setThemeMode('dark')} />
				<AppButton buttonType={getVariantByTheme('light')} text='Light' onClick={() => setThemeMode('light')} />
				<AppButton
					buttonType={getVariantByTheme('device')}
					text='System'
					onClick={() => setThemeMode('device')}
				/>
			</Button.Group>
		</>
	);
}
