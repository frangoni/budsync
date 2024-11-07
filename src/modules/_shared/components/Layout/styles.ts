import { styled } from 'styled-components';

export const MainWrapper = styled.main`
	width: 100vw;
	max-width: 100vw;
	height: 100vh;
	overflow: auto;
`;

export const Card = styled.div`
	border-radius: 1.5rem;
	border: 0.15rem solid ${({ theme }) => theme.colors.border.primary};
	background-color: ${({ theme }) => theme.colors.background.cards};
	padding: 2rem;
`;

export const HeaderWrapper = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 1rem;
	border-bottom: 0.25rem groove ${({ theme }) => theme.colors.border.primary};
`;
export const CenteredWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	max-height: 100vh;
	width: 100%;
`;

export const ToolbarWrapper = styled.div`
	display: flex;
	gap: 2rem;
	align-items: center;
	padding: 1rem 0 2rem;
	flex-flow: row wrap;

	@media (max-width: 768px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
	}
`;
