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
		display: flex;
		justify-content: center;
		align-items: center;
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

export const StatusContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
`;

export const TrafficLight = styled.div<{ active: boolean }>`
	width: 1.5rem;
	height: 1.5rem;
	border: 0.15rem solid ${({ theme }) => theme.colors.background.cards};
	border-radius: 50%;
	background: ${({ active }) =>
		active ? 'radial-gradient(circle, #32cd32, #006400)' : 'radial-gradient(circle, #ff6347, #8b0000)'};
	box-shadow: 0 0 15px ${({ active }) => (active ? '#32cd32' : '#ff6347')};
`;
