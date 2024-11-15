import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const SidebarHeader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;
	padding-bottom: 1rem;
	border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};

	img {
		height: 3rem;
	}
`;

export const SidebarFooter = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-top: 1rem;
`;

export const SidebarLink = styled(Link)`
	display: flex;
	padding: 0.5rem;
	align-items: center;
	justify-content: start;
	gap: 0.5rem;
	border-radius: 0.5rem;
	cursor: pointer;
	transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

	p {
		opacity: 0;
		transform: translateX(0.5rem);
		transition: all 0.2s linear;
	}

	svg {
		min-width: 1.5rem;
		font-size: 1.5rem;
	}

	&:hover {
		background-color: ${({ theme }) => theme.colors.background.mainDimmer};
		color: ${({ theme }) => theme.colors.text.active};
	}
`;

export const SidebarLinksWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	flex-grow: 1;
	border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
	padding-block: 1rem;

	#settings {
		margin-top: auto;
	}
`;

export const CollapseButton = styled.div`
	position: absolute;
	top: 50%;
	right: -1.25rem;
	border-radius: 0.5rem;
	padding: 0.25rem 0.5rem;
	background-color: ${({ theme }) => theme.colors.background.cards};
	border: 1px solid ${({ theme }) => theme.colors.border.primary};
	cursor: pointer;
	transition: all 0.3s ease-out;

	svg {
		transition: transform 0.5s linear;
		transform: rotateY(0deg);
	}
	&:hover {
		color: ${({ theme }) => theme.colors.text.active};
	}
`;

export const SidebarWrapper = styled.aside`
	background-color: ${({ theme }) => theme.colors.background.sidebar};
	border: 1px solid ${({ theme }) => theme.colors.border.primary};
	color: ${({ theme }) => theme.colors.text.primary};
	border-radius: 1rem;
	margin: 0.5rem;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	width: auto;
	max-width: 4.75rem;
	transition: all 0.3s ease-out;
	position: relative;

	a {
		text-decoration: none;
		color: inherit;
	}

	p {
		pointer-events: none;
	}

	&.active {
		color: ${({ theme }) => theme.colors.text.primary};
		max-width: 15rem;

		${SidebarLink} p {
			opacity: 1;
			transform: translateY(0);
			pointer-events: all;
		}

		${CollapseButton} {
			right: -0.75rem;
			svg {
				transform: rotateY(180deg);
			}
		}
	}

	@media (max-width: 768px) {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 100;
		transition: all 0.3s ease-out;
		transform: translateX(-100%);

		${CollapseButton} {
			right: -1.5rem;
		}

		${SidebarLink} p {
			pointer-events: none;
		}
		&.active {
			transform: translateX(0);

			${SidebarLink} p {
				pointer-events: all;
			}
		}
	}
`;

export const MobileBackdrop = styled.div`
	display: none;

	@media (max-width: 768px) {
		display: block;
		transition: all 0.3s ease-out;
		background-color: rgba(0, 0, 0, 0);
		backdrop-filter: blur(0rem);
		&.active {
			z-index: 99;
			position: fixed;
			height: 100vh;
			width: 100vw;
			background-color: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(0.5rem);
		}
	}
`;

export const LeafWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 10rem;
	height: 10rem;
`;
