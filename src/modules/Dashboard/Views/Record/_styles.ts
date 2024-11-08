import styled from 'styled-components';

export const PlantImgWrapper = styled.div`
	cursor: pointer;
	margin-top: 1rem;
	width: 100%;
	max-width: 20rem;

	img {
		width: 100%;
		border: 0.25rem solid ${({ theme }) => theme.colors.border.context};
		border-radius: 1rem;
	}
`;

export const ImageDetailsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: start;
	justify-content: space-around;
	margin-bottom: 2rem;
`;

export const RecordsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.251rem;
	margin-top: 1rem;

	> div {
		padding: 1rem;
	}
`;

export const ExpandedImage = styled.img`
	max-height: calc(100vh - 6rem);
	border: 0.25rem solid ${({ theme }) => theme.colors.border.context};
	border-radius: 1rem;
`;
