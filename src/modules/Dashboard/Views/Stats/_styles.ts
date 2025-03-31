import styled from 'styled-components';

export const FiltersWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: 2rem;
	grid-row-gap: 1.5rem;
	margin-bottom: 2rem;

	.ant-picker-range {
		background-color: ${({ theme }) => theme.colors.background.cards};
		border: none;
		border-radius: 0.25rem;
		color: ${({ theme }) => theme.colors.text.primary};
		.ant-picker-suffix,
		.ant-picker-separator {
			color: ${({ theme }) => theme.colors.text.primary};
		}
		.ant-picker-active-bar {
			background: ${({ theme }) => theme.colors.background.main};
		}
	}

	@media (max-width: 768px) {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		background-color: ${({ theme }) => theme.colors.background.cards};
		padding: 1.5rem;
		border-radius: 1rem;
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
		border: 1px solid ${({ theme }) => theme.colors.border.primary};
	}
`;

export const FilterField = styled.span`
	display: flex;
	flex-direction: column;
	min-width: 3rem;
	width: 100%;
	max-width: 30vw;
	gap: 0.5rem;

	@media (max-width: 768px) {
		max-width: 100%;
	}
`;

export const GraphContainer = styled.div`
	width: 100%;
	height: 70vh;
	margin-top: 2rem;

	.recharts-default-tooltip {
		background-color: ${({ theme }) => theme.colors.background.cards} !important;
		border: none !important;
		border-radius: 0.25rem !important;
	}

	background-color: ${({ theme }) => theme.colors.background.cards};
	border-radius: 0.5rem;
	box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
	border: 1px solid ${({ theme }) => theme.colors.border.primary};
	padding: 2rem 0rem;

	@media (max-width: 768px) {
		width: 100%;
		margin-top: 0rem;
		height: 50vh;
	}
`;

export const KPISWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	margin-top: 4rem;

	@media (max-width: 768px) {
		margin-top: 2rem;
	}
`;

export const StatLabel = styled.div`
	position: absolute;
	right: 0;
	top: 0;
	padding: 0.5rem;
	min-width: 50%;
	border-bottom-left-radius: 0.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const StatValue = styled.div`
	display: flex;
	flex-direction: row;
	align-items: baseline;
	justify-content: center;
	min-width: 15rem;
	gap: 0.25rem;
	margin-top: 1rem;

	p {
		font-size: 5rem;
		font-weight: 700;
		line-height: 1;
	}
`;

export const StatCardsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: 2rem;

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}
`;

export const PDFWrapper = styled.div`
	background-color: ${({ theme }) => theme.colors.background.primary};
`;

export const METRICS_COLORS = {
	nutrient: '#82ca9d',
	temperature: '#8884d8',
	humidity: '#ff7300',
};
