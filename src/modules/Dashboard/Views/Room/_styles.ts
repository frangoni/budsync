import styled from 'styled-components';

export const StatusBadge = styled.div<{ active: string }>`
	display: inline-block;
	padding: 0.25rem 0.5rem;
	border-radius: 0.25rem;
	background-color: ${({ active, theme }) =>
		active === 'true' ? theme.colors.background.success : theme.colors.background.lightDanger};
	border: 1px solid
		${({ active, theme }) => (active === 'true' ? theme.colors.border.success : theme.colors.border.danger)};
	font-weight: 500;
	text-transform: capitalize;
`;
