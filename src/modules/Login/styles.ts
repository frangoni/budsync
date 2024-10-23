import { styled } from 'styled-components';

export const LoginContainer = styled.div`
	display: flex;
	justify-content: stretch;
	height: 100%;
`;

export const ImageWrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	width: 40%;
	overflow: hidden;

	@media only screen and (max-width: 768px) {
		display: none;
	}
`;

export const BgImage = styled.img`
	position: absolute;
	width: 100%;
	min-height: 100%;
	filter: brightness(50%);
	-webkit-filter: brightness(50%);
`;

export const FormWrapper = styled.div`
	display: flex;
	flex-grow: 1;
	border-radius: 2rem;
	justify-content: center;
	align-items: center;
	transform: translateX(-2rem);
	background-color: ${props => props.theme.colors.background.primary};
	box-shadow: -41px 0px 32px -24px rgba(0, 0, 0, 0.75);
	-webkit-box-shadow: -41px 0px 32px -24px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: -41px 0px 32px -24px rgba(0, 0, 0, 0.75);

	form {
		width: 30rem;
		max-width: 75vw;
	}

	.logo {
		width: 8rem;
	}

	@media only screen and (max-width: 768px) {
		transform: translateX(0rem);
		border-radius: 0rem;
		box-shadow: none;
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
