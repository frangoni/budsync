import { styled } from 'styled-components';

export const MainWrapper = styled.main`
	width: 100vw;
	max-width: 100vw;
	height: 100vh;
	overflow: auto;
`;

export const Card = styled.div`
	border-radius: 1.5rem;
	border: 0.15rem solid ${props => props.theme.colors.border.primary};
	background-color: ${props => props.theme.colors.background.cards};
	padding: 2rem;
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
