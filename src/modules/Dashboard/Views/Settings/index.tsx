import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';
import Header from '@/modules/_shared/components/Layout/Header';
import React from 'react';
import ThemeSelector from './ThemeSelector';

export default function Settings() {
	return (
		<>
			<Header title='Settings' description='Manage app settings' />
			<SectionContainer>
				<ThemeSelector />
			</SectionContainer>
		</>
	);
}
