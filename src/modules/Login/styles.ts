import { styled } from 'styled-components';

export const LoginContainer = styled.div`
	display: flex;
	justify-content: stretch;
	height: 100%;
	width: 100%;
`;

export const ImageWrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	width: 40%;
	overflow: hidden;
	box-shadow: -10px -1px 31px -4px rgba(0, 0, 0, 0.75) inset;
	-webkit-box-shadow: -10px -1px 31px -4px rgba(0, 0, 0, 0.75) inset;
	-moz-box-shadow: -10px -1px 31px -4px rgba(0, 0, 0, 0.75) inset;

	@media only screen and (max-width: 768px) {
		display: none;
	}
`;

export const BgImage = styled.img`
	position: absolute;
	width: 100%;
	z-index: -1;
	mix-blend-mode: soft-light;
`;

export const FormWrapper = styled.div`
	height: 100%;
	display: flex;
	flex-grow: 1;
	justify-content: center;
	align-items: center;

	form {
		width: 30rem;
		max-width: 75vw;
	}

	.logo {
		width: 8rem;
	}
`;

export const FormHeader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 2rem;
`;
