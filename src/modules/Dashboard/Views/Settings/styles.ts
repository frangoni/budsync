import styled from 'styled-components';

export const ParametersWrapper = styled.div`
	width: 50%;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

export const SettingsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: start;
	justify-content: space-around;

	@media (max-width: 768px) {
		flex-direction: column-reverse;
		gap: 1rem;
	}
`;

export const ThemeSelectorWrapper = styled.div``;
