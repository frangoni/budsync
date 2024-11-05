import styled from 'styled-components';

export const WelcomeContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	width: 100%;
	flex-grow: 1;

	img {
		max-width: 250px;
	}
`;

export const WelcomeColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 50%;
	gap: 2rem;
`;
