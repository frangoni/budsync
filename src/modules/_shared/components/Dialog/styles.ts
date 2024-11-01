import { keyframes, styled } from 'styled-components';

const SlideUp = keyframes`
  from {
    transform: translateY(5rem) scale(0.8);
	opacity: 0;
  }
  to{
    transform: translateY(0rem) scale(1);
	opacity: 1;
  }`;

export const StyledDialog = styled.dialog`
	position: fixed;
	width: 100vw;
	height: 100vh;
	border: none;
	background: transparent;
	z-index: -1;

	#closeModal {
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-size: 1.5rem;
	}

	&[open] {
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 3;
		backdrop-filter: blur(5px);
		--webkit-backdrop-filter: blur(5px);
		background-color: ${({ theme }) => theme.colors.background.overlay};

		& > div {
			animation: ${SlideUp} 0.5s ease forwards;
		}
	}
`;