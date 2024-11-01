import { Form, Input } from 'antd';
import { styled } from 'styled-components';

export const AppInput = styled(Input)`
	border-radius: 0.25rem;
	padding: 0.5rem 1rem;
	width: 100%;
	font-size: 1.25rem;
	border: 0.2rem solid transparent;

	&:hover,
	&:focus {
		border: 0.2rem solid ${({ theme }) => theme.colors.border.active};
	}
`;

export const AppForm = styled(Form)`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	color: ${({ theme }) => theme.colors.text.primary};

	label {
		font-size: 1.25rem !important;
	}
`;
