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
	padding: 2rem 1rem;
	width: 50%;

	.detail-row {
		display: flex;
		justify-content: start;
		align-items: center;
		gap: 1rem;
		border-bottom: 0.125rem groove ${({ theme }) => theme.colors.border.context};
		padding-bottom: 1rem;

		&:last-of-type {
			border-bottom: none;
			padding-bottom: 0;
		}

		@media (max-width: 768px) {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}

	button {
		align-self: flex-end;
		justify-self: flex-end;
		margin-top: auto;
	}

	@media (max-width: 768px) {
		width: 100%;
	}
`;

export const TaskMainWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 2rem;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;
