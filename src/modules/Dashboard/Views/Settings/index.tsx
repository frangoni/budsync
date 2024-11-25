import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';
import Header from '@/modules/_shared/components/Layout/Header';
import ThemeSelector from './ThemeSelector';
import Parameters from './Parameters';
import { SettingsWrapper } from './styles';

export default function Settings() {
	return (
		<>
			<Header title='Settings' description='Manage app settings' />
			<SectionContainer>
				<SettingsWrapper>
					<Parameters />
					<ThemeSelector />
				</SettingsWrapper>
			</SectionContainer>
		</>
	);
}
