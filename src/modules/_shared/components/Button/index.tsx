import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import { styled } from 'styled-components';

interface AppButtonProps extends ButtonProps {
	text?: string;
	buttonType?: 'primary' | 'secondary' | 'danger' | 'icon';
}

export default function AppButton({ text, buttonType = 'primary', ...rest }: AppButtonProps) {
	return (
		<StyledButton className={buttonType} {...rest}>
			{text}
		</StyledButton>
	);
}

const StyledButton = styled(Button)`
	background-color: ${({ theme }) => theme.colors.background.buttons.primary};
	color: ${({ theme }) => theme.colors.text.button};
	border: 1px solid ${({ theme }) => theme.colors.border.primary};
	border-radius: 0.5rem;
	padding: 1rem;
	height: 3rem;
	min-width: 3rem;
	outline: none !important;
	box-shadow: none !important;

	&:disabled {
		opacity: 0.5;
		color: ${({ theme }) => theme.colors.text.button};
		&:hover {
			background-color: none !important ;
		}
	}

	&:hover {
		background-color: ${({ theme }) => theme.colors.background.secondary} !important;
		color: ${({ theme }) => theme.colors.text.active} !important;
		border: 1px solid ${({ theme }) => theme.colors.border.active} !important;
	}

	svg {
		font-size: 1.5rem;
	}

	&.secondary {
		background-color: ${({ theme }) => theme.colors.background.buttons.toolbar};
		border: 1px solid ${({ theme }) => theme.colors.border.primary};
		color: ${({ theme }) => theme.colors.text.active};

		&:hover {
			background-color: ${({ theme }) => theme.colors.background.main} !important;
			color: ${({ theme }) => theme.colors.text.white} !important;
		}

		&:disabled {
			opacity: 0.5;
			&:hover {
				background-color: none !important ;
			}
		}
	}

	&.danger {
		background-color: ${({ theme }) => theme.colors.border.danger};
		color: ${({ theme }) => theme.colors.text.primary};

		&:hover {
			background-color: ${({ theme }) => theme.colors.background.danger} !important;
			color: ${({ theme }) => theme.colors.text.danger} !important;
		}
	}

	&.icon {
		background-color: transparent;
		border: none;
		padding: 0 !important;

		svg {
			font-size: 2rem;
		}

		&:hover {
			transform: scale(1.1);
			background-color: transparent !important;
			border: none !important;
		}
	}
`;
