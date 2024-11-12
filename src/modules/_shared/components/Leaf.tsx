import styled from 'styled-components';

export default function Leaf() {
	return (
		<StyledLeaf className='leaf-container'>
			<span className='leaf leaf-small leaf-1'></span>
			<span className='leaf leaf-small leaf-2'></span>
			<span className='leaf leaf-medium leaf-3'></span>
			<span className='leaf leaf-medium leaf-4'></span>
			<span className='leaf leaf-large leaf-5'></span>
			<span className='leaf leaf-large leaf-6'></span>
			<span className='leaf leaf-huge leaf-7'></span>
			<span className='stem'></span>
		</StyledLeaf>
	);
}

export const StyledLeaf = styled.div`
	position: relative;
	width: 2.5rem;
	height: 3rem;
	transition: all 0.5s ease;
	border: 1px solid ${({ theme }) => theme.colors.border.primary};

	.leaf {
		position: absolute;
		clip-path: polygon(50% 0, 60% 70%, 50% 100%, 40% 70%);
		background: ${({ theme }) => theme.colors.background.leaf};
		transform-origin: center bottom;
		bottom: 40%;
		left: 50%;
		transition: all 0.5s ease;

		z-index: 1;
	}

	.leaf-small {
		width: 75%;
		height: 35%;
	}
	.leaf-medium {
		width: 80%;
		height: 45%;
	}
	.leaf-large {
		width: 85%;
		height: 55%;
	}
	.leaf-huge {
		width: 90%;
		height: 65%;
	}
	.leaf-1 {
		transform: translateX(-50%) rotate(-120deg);
	}
	.leaf-2 {
		transform: translateX(-50%) rotate(120deg);
	}
	.leaf-3 {
		transform: translateX(-50%) rotate(-80deg);
	}
	.leaf-4 {
		transform: translateX(-50%) rotate(80deg);
	}
	.leaf-5 {
		transform: translateX(-50%) rotate(40deg);
	}
	.leaf-6 {
		transform: translateX(-50%) rotate(-40deg);
	}
	.leaf-7 {
		transform: translateX(-50%) rotate(0deg);
	}

	.stem {
		position: absolute;
		bottom: 0;
		left: 50%;
		clip-path: polygon(47.5% 0, 52.5% 0, 55% 100%, 45% 100%);
		transform: translateX(-50%);
		width: 100%;
		height: 50%;
		background: ${({ theme }) => theme.colors.background.leaf};
		transition: all 0.5s ease;
	}

	&.is-arrow {
		.leaf-1,
		.leaf-2,
		.leaf-3,
		.leaf-4,
		.leaf-7 {
			opacity: 0;
		}

		.stem {
			transform: translateX(-25%) translateY(-50%);
			clip-path: polygon(40% 46%, 40% 54%, 0 65%, 0 35%);
		}

		.leaf-5 {
			clip-path: polygon(20% 65%, 35% 65%, 0 100%, 0 85%);
			transform: translateX(-10%) translateY(17.5%) rotate(0deg);
		}

		.leaf-6 {
			clip-path: polygon(20% 65%, 35% 65%, 0 100%, 0 85%);
			transform: translateX(-10%) translateY(-52.5%) rotateX(180deg);
		}
	}
`;
