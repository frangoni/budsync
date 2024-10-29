import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import { styled } from 'styled-components';

interface AppButtonProps extends ButtonProps {
	text?: string;
	buttonType?: 'primary' | 'secondary' | 'danger';
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
	color: ${({ theme }) => theme.colors.text.primary};
	border: ${({ theme }) => theme.colors.border.primary};
	border-radius: 0.5rem;
	padding: 1rem;
	height: 3rem;
	min-width: 8rem;

	:hover {
		color: ${({ theme }) => theme.colors.text.active};
	}

	svg {
		font-size: 2.5rem;
		&:hover {
			color: ${({ theme }) => theme.colors.text.active};
			border: none;
		}
	}

	&.secondary {
		background-color: ${({ theme }) => theme.colors.background.buttons.toolbar};
		border: 1px solid ${({ theme }) => theme.colors.border.primary};

		:hover {
			background-color: ${({ theme }) => theme.colors.background.buttons.toolbarHover};
			color: ${({ theme }) => theme.colors.text.active};
			border: 1px solid ${({ theme }) => theme.colors.border.active};
		}
	}

	&.danger {
		background-color: ${({ theme }) => theme.colors.border.danger};
		color: ${({ theme }) => theme.colors.text.primary};
	}
`;
