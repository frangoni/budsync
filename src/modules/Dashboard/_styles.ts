import { styled } from 'styled-components';

export const ContentWrapper = styled.section`
	flex: 1;
	height: 100vh;
	max-height: 100vh;
	overflow-y: auto;
	width: 100%;
	padding: 4rem 2rem 2rem;
	display: flex;
	flex-direction: column;

	@media (max-width: 768px) {
		padding: 2rem 1rem;
	}
`;

export const DashboardWrapper = styled.main`
	display: flex;
	flex-direction: row;
	position: relative;
	max-height: 100vh;
	overflow-y: auto;
`;
