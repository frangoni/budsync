import { Form, Input, Select, Switch } from 'antd';
import { css, styled } from 'styled-components';

const InputBaseStyles = css`
	border-radius: 0.25rem;
	padding: 0.5rem 1rem;
	width: 100%;
	font-size: 1.25rem;
	border: 0.2rem solid ${({ theme }) => theme.colors.border.primary};
	color: ${({ theme }) => theme.colors.text.primary};
	background-color: ${({ theme }) => theme.colors.background.primary} !important;

	&::placeholder {
		color: ${({ theme }) => theme.colors.text.secondary};
	}
	.ant-input-status-error {
		background-color: ${({ theme }) => theme.colors.background.primary};
	}

	&:disabled {
		color: ${({ theme }) => theme.colors.text.secondary};
		border: 0.2rem solid ${({ theme }) => theme.colors.border.active};
	}

	&:hover,
	&:focus {
		border: 0.2rem solid ${({ theme }) => theme.colors.border.active};
		background-color: ${({ theme }) => theme.colors.background.secondary};
	}
`;

export const AppInput = styled(Input)`
	${InputBaseStyles}
`;

export const PasswordInput = styled(Input.Password)`
	${InputBaseStyles}
`;

export const AppSelect = styled(Select)`
	${InputBaseStyles}
	min-height: 4rem;

	.anticon {
		color: ${({ theme }) => theme.colors.text.secondary};
	}

	.ant-select-selector {
		background-color: transparent !important;
		color: ${({ theme }) => theme.colors.text.primary};
		border: none !important;
		padding: 0 !important;
	}
	.ant-select-selector {
		background-color: transparent !important;
		border: none !important;
	}

	.ant-select-selection-placeholder {
		color: ${({ theme }) => theme.colors.text.secondary} !important;
	}

	.ant-select-item-option {
		color: ${({ theme }) => theme.colors.text.primary};
		&:hover {
			background-color: ${({ theme }) => theme.colors.background.secondary};
			color: ${({ theme }) => theme.colors.text.primary};
		}

		&.ant-select-item-option-selected {
			background-color: ${({ theme }) => theme.colors.background.secondary};
			color: ${({ theme }) => theme.colors.text.primary};
		}
	}
`;

export const AppForm = styled(Form)`
	width: 100%;
	display: flex;
	flex-direction: column;
	color: ${({ theme }) => theme.colors.text.primary};
	background-color: transparent;

	h4 {
		color: ${({ theme }) => theme.colors.text.primary};
	}

	label {
		font-size: 1.25rem !important;
	}
`;

export const AppSwitch = styled(Switch)`
	.ant-switch-handle::before {
		background-color: ${({ theme }) => theme.colors.background.secondary};
	}

	&.ant-switch.ant-switch-checked {
		background-color: ${({ theme }) => theme.colors.background.main};

		&:hover {
			background-color: ${({ theme }) => theme.colors.background.mainDimmer};
		}
	}
`;
