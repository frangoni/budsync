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
	margin-bottom: 2rem;
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
	border-top: 0.25rem groove ${({ theme }) => theme.colors.border.primary};
`;
