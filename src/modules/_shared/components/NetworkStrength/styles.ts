import styled from 'styled-components';

export const NetworkStrengthWrapper = styled.div`
	position: fixed;
	top: 0.5rem;
	right: 0.5rem;
	display: flex;
	gap: 0.5rem;
	align-items: center;

	@media (max-width: 768px) {
		display: none;
	}
`;
