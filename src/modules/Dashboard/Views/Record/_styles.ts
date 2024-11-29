import styled from 'styled-components';

export const PlantImgWrapper = styled.div`
	cursor: pointer;
	margin-top: 1rem;
	width: 100%;
	max-height: 20rem;

	img {
		max-height: 20rem;
		border: 0.25rem solid ${({ theme }) => theme.colors.border.context};
		border-radius: 1rem;
	}

	@media (max-width: 768px) {
		max-width: 100%;
	}
`;

export const ImageDetailsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	margin-bottom: 2rem;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: left;
		justify-content: center;
		gap: 1rem;
	}
`;

export const RecordsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.25rem;
	margin-top: 1rem;

	> div {
		padding: 1rem;
	}

	@media (max-width: 768px) {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
`;

export const RecordsDetailsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	gap: 0.5rem;

	@media (max-width: 768px) {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
`;
