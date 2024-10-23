import { styled } from 'styled-components';

export const SidebarWrapper = styled.aside`
	background-color: ${({ theme }) => theme.colors.background.cards};
	border: 1px solid ${({ theme }) => theme.colors.border.primary};
	color: ${({ theme }) => theme.colors.text.primary};
	border-radius: 1rem;
	margin: 0.5rem;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	width: auto;
	max-width: 4.75rem;
	transition: max-width 0.3s ease-out;
	position: relative;

	.collapse-sidebar {
		position: absolute;
		top: 50%;
		right: -0.5rem;
		border-radius: 0.5rem;
		padding: 0.25rem 0.5rem;
		background-color: ${({ theme }) => theme.colors.background.cards};
		border: 1px solid ${({ theme }) => theme.colors.border.primary};
		cursor: pointer;

		svg {
			transition: transform 0.3s ease-in-out;
			transform: rotate(0deg);
		}
		&:hover {
			color: ${({ theme }) => theme.colors.text.active};
		}
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	&.active {
		background-color: ${({ theme }) => theme.colors.background.cards};
		border: 1px solid ${({ theme }) => theme.colors.border.primary};
		color: ${({ theme }) => theme.colors.text.primary};
		max-width: 15rem;

		.nav-link p {
			opacity: 1;
			transform: translateY(0);
		}

		.collapse-sidebar {
			svg {
				transform: rotate(180deg);
			}
		}
	}
	.nav-links-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex-grow: 1;
		border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
	}

	.nav-link {
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
	}

	.nav-header {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 1rem;
		margin-bottom: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};

		img {
			height: 3rem;
		}
	}

	.nav-footer {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1rem;
	}
`;
