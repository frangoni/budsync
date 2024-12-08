import styled from 'styled-components';

export const NetworkStrengthWrapper = styled.div`
	//glassmorphism
	background: ${({ theme }) => theme.colors.background.overlay};
	border: 0.05rem solid ${({ theme }) => theme.colors.border.primary};
	color: ${({ theme }) => theme.colors.text.button};
	backdrop-filter: blur(1rem);
	border-radius: 0.5rem;
	padding: 0.25rem 0.5rem;
	z-index: 10;

	position: fixed;
	top: 0.5rem;
	right: 1rem;
	display: flex;
	gap: 0.5rem;
	align-items: center;

	@media (max-width: 768px) {
		display: none;
	}
`;
