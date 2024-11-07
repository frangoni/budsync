import { useNavigate } from 'react-router-dom';
import { HeaderWrapper } from './styles';
import AppButton from '../Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { ReactNode } from 'react';

interface HeaderProps {
	title: string;
	description?: string;
	shouldGoBack?: boolean;
	subtitle?: ReactNode;
}

export default function Header({ title, description, subtitle, shouldGoBack = false }: HeaderProps) {
	const navigate = useNavigate();
	const navigateBack = () => navigate(-1);

	return (
		<HeaderWrapper>
			<div>
				<span>
					<h1>{title}</h1>
					{subtitle}
				</span>
				<p>{description}</p>
			</div>
			{shouldGoBack && (
				<AppButton
					icon={<Icon icon='mdi:keyboard-backspace' />}
					buttonType='secondary'
					onClick={navigateBack}
					size='large'
				/>
			)}
		</HeaderWrapper>
	);
}
