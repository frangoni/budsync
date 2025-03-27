import { Form, Input, Radio, Select, Switch } from 'antd';
import { css, styled } from 'styled-components';

const InputBaseStyles = css`
	border-radius: 0.25rem;
	padding: 0.5rem 1rem;
	width: 100%;
	min-width: 6rem;
	font-size: 1.25rem;
	border: 0.2rem solid ${({ theme }) => theme.colors.border.primary};
	color: ${({ theme }) => theme.colors.text.primary};
	background-color: ${({ theme }) => theme.colors.background.primary} !important;

	&::placeholder {
		color: ${({ theme }) => theme.colors.text.secondary} !important;
	}

	.ant-input-status-error {
		background-color: ${({ theme }) => theme.colors.background.primary};
	}

	.ant-input-suffix,
	ant-input-prefix {
		color: ${({ theme }) => theme.colors.text.primary};
		transform: scale(1.2);
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
	min-height: 3rem;

	.anticon {
		color: ${({ theme }) => theme.colors.text.secondary};
	}

	.ant-select-selector {
		background-color: transparent !important;
		color: ${({ theme }) => theme.colors.text.primary};
		border: none !important;
		box-shadow: none !important;
		padding: 0 !important;
	}

	.ant-select-selection-placeholder {
		color: ${({ theme }) => theme.colors.text.secondary} !important;
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
	max-width: 3rem;
	.ant-switch-handle::before {
		background-color: ${({ theme }) => theme.colors.background.main};
	}
	.ant-switch-inner {
		background-color: ${({ theme }) => theme.colors.background.mainDimmer};
	}

	&.ant-switch.ant-switch-checked {
		.ant-switch-handle::before {
			background-color: ${({ theme }) => theme.colors.background.primary};
		}
		.ant-switch-inner {
			background-color: ${({ theme }) => theme.colors.background.main};
		}
	}
`;

export const AppRadioGroup = styled(Radio.Group)`
	.ant-radio-button-wrapper {
		background-color: ${({ theme }) => theme.colors.background.secondary};
		border: 0.15rem solid ${({ theme }) => theme.colors.border.primary};
		&::before {
			content: none;
		}
	}

	.ant-radio-button-wrapper-checked {
		background-color: ${({ theme }) => theme.colors.background.main};
		color: ${({ theme }) => theme.colors.text.button} !important;
		border: 0.15rem solid ${({ theme }) => theme.colors.border.active} !important;
		outline: none !important;

		&:hover {
			background-color: ${({ theme }) => theme.colors.background.mainDimmer};
			border: 0.15rem solid ${({ theme }) => theme.colors.border.active};
		}
	}
`;
