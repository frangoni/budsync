import LoginBG from '@/modules/_shared/assets/webp/login-bg.webp';
import MainContainer from '@/modules/_shared/components/Layout/MainContainer';
import { BgImage, ImageWrapper, LoginContainer } from './styles';

export default function AuthContainer({ children }: { children: React.ReactNode }) {
	return (
		<MainContainer>
			<LoginContainer>
				<ImageWrapper>
					<BgImage src={LoginBG} />
				</ImageWrapper>
				{children}
			</LoginContainer>
		</MainContainer>
	);
}
