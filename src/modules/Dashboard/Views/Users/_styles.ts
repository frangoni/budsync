import styled from 'styled-components';

export const UserStatus = styled.div<{ status: string }>`
	display: inline-block;
	padding: 0.25rem 0.5rem;
	border-radius: 0.25rem;
	background-color: ${({ status, theme }) =>
		status === 'Active'
			? theme.colors.background.success
			: status === 'Archived'
			? theme.colors.background.lightDanger
			: theme.colors.background.warning};
	border: 1px solid
		${({ status, theme }) =>
			status === 'Active'
				? theme.colors.border.success
				: status === 'Archived'
				? theme.colors.border.danger
				: theme.colors.border.warning};
	font-weight: 500;
	text-transform: capitalize;
`;
