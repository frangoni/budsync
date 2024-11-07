import styled from 'styled-components';

export const SwipperWrapper = styled.div`
	.swiper {
		width: 100%;
		margin-block: 2rem;
	}

	.swiper-slide {
		background-position: center;
		background-size: cover;
		width: 20rem;
		height: 20rem;
	}

	.swiper-slide img {
		width: 100%;
		border-radius: 0.5rem;
		border: 0.15rem solid ${({ theme }) => theme.colors.border.context};
	}
`;

export const UploaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;

	img {
		width: 100%;
		border-radius: 0.5rem;
		border: 0.15rem solid ${({ theme }) => theme.colors.border.context};
		max-width: 20rem;
	}
`;
