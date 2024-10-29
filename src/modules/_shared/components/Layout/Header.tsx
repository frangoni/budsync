import { useNavigate } from 'react-router-dom';
import { HeaderWrapper } from './styles';
import AppButton from '../Button';
import { Icon } from '@iconify/react/dist/iconify.js';

interface HeaderProps {
	title: string;
	description?: string;
	shouldGoBack?: boolean;
}

export default function Header({ title, description, shouldGoBack = false }: HeaderProps) {
	const navigate = useNavigate();
	const navigateBack = () => navigate(-1);

	return (
		<HeaderWrapper>
			<span>
				<h1>{title}</h1>
				<p>{description}</p>
			</span>
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
