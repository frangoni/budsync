import styled from 'styled-components';

export const RoomCardLayout = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

export const RoomsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	gap: 2rem;
`;
