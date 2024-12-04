import styled, { keyframes } from 'styled-components';

export const LoaderWrapper = styled.div`
	.loader {
		width: 5rem;
		height: 2rem;
		border: 2px solid ${({ theme }) => theme.colors.border.active};
		border-radius: 50%;
		display: grid;
		animation: l2 2s infinite linear;
	}
	.loader:before,
	.loader:after {
		content: '';
		grid-area: 1/1;
		border: inherit;
		border-radius: 50%;
		animation: inherit;
		animation-duration: 3s;
	}
	.loader:after {
		--s: -1;
	}
	@keyframes l2 {
		100% {
			transform: rotate(calc(var(--s, 1) * 1turn));
		}
	}
`;

const Typing = keyframes`
	from{
		width: 0ch;
	} 


`;

export const ThreeDotsWrapper = styled.div`
	width: 4ch;
	text-wrap: nowrap;
	display: inline-block;
	font-family: monospace;
	overflow: hidden;
	font-size: inherit;
	line-height: 0.7;
	color: inherit;
	animation: ${Typing} 1s steps(4) infinite alternate-reverse;
`;
