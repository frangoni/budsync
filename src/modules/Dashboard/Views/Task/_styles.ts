import styled from 'styled-components';

export const TaskDetailsWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1.5rem;
	border: 0.25rem solid ${({ theme }) => theme.colors.border.primary};
	border-radius: 0.5rem;
	background-color: ${({ theme }) => theme.colors.background.secondary};
	padding: 1rem;
	width: 50%;

	.detail-row {
		display: flex;
		justify-content: start;
		align-items: center;
		gap: 1rem;
		border-bottom: 0.125rem solid ${({ theme }) => theme.colors.border.primary};
		padding-bottom: 1rem;
	}

	button {
		align-self: flex-end;
		justify-self: flex-end;
		margin-top: auto;
	}
`;

export const TaskMainWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 2rem;
`;
