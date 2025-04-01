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
	position: relative;
	overflow: hidden;
`;

export const GlassCard = styled(Card)`
	background-color: ${({ theme }) => theme.colors.background.glass};
	border: 0.015rem solid ${({ theme }) => theme.colors.border.primary};
	backdrop-filter: blur(0.5rem);
	-webkit-backdrop-filter: blur(0.5rem);
	border-radius: 1rem;
`;

export const HeaderWrapper = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 1rem;
	border-bottom: 0.25rem groove ${({ theme }) => theme.colors.border.primary};

	.title-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}

	h1,
	p {
		font-family: 'Grandstander', cursive;
	}
`;
export const CenteredWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	max-height: 100vh;
	text-align: center;
	max-width: 35rem;
	margin: 0 auto;
`;

export const ToolbarWrapper = styled.div`
	display: flex;
	gap: 2rem;
	align-items: center;
	padding-top: 1rem;
	flex-flow: row wrap;

	@media (max-width: 768px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
	}
`;

export const ConfirmationWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	text-align: center;

	svg {
		color: ${({ theme }) => theme.colors.text.warning};
		font-size: 5rem;
		margin-bottom: 1rem;
	}
`;

export const ButtonGroup = styled.div`
	display: flex;
	gap: 1rem;
`;

export const SectionContainer = styled.article`
	margin-top: 2rem;
	position: relative;
`;
