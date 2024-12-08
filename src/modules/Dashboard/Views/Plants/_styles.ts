import styled, { keyframes } from 'styled-components';

export const PlantsMainContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
	gap: 2rem;
	width: 100%;

	h4 {
		align-self: center;
	}

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export const PlantScannerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 50%;

	#scanner {
		position: relative;
		min-width: 40vw;

		button {
			position: absolute;
			top: 1rem;
			right: 1rem;
			z-index: 1;
		}
	}

	@media (max-width: 768px) {
		width: 100%;

		#scanner {
			min-width: 90%;
		}
	}
`;

export const QRCardLayout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2rem;
	cursor: pointer;

	svg {
		font-size: 12.5rem;
	}
`;

export const PlantFinderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
	width: 50%;
	padding: 0 4rem;
	gap: 2rem;

	@media (max-width: 768px) {
		width: 100%;
		padding: 0;
	}
`;

export const PlantInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
	gap: 0.5rem;
`;

const SlideUp = keyframes`
  from {
    transform: translateY(5rem) scale(0.8);
	opacity: 0;
  }
  to{
    transform: translateY(0rem) scale(1);
	opacity: 1;
  }`;

export const FloatingScannerContainer = styled.div`
	display: none;

	@media (max-width: 768px) {
		display: flex;
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		z-index: 10;

		#scanner:has(video) {
			position: fixed !important;
			left: 0;
			top: 0;
			width: 98vw;
			height: 98vh;
			margin: 1vw 1vh;
			display: flex;
			background-color: ${({ theme }) => theme.colors.background.overlay};
			border-radius: 1rem;
			animation: ${SlideUp} 0.5s ease forwards;

			video {
				width: 100% !important;
			}

			button {
				position: absolute;
				top: 1rem;
				right: 1rem;
				z-index: 1;
			}
		}
	}
`;
