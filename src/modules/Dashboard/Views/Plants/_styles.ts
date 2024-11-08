import styled from 'styled-components';

export const PlantsMainContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 2rem;
	width: 100%;
	height: 100%;

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

	svg {
		font-size: 12.5rem;
	}
`;

export const PlantFinderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 50%;
	padding: 0 4rem;

	@media (max-width: 768px) {
		width: 100%;
		padding: 0;
	}
`;