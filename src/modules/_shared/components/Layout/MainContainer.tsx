import { PropsWithChildren } from 'react';
import { MainWrapper } from './styles';

export default function MainContainer({ children }: PropsWithChildren) {
	return <MainWrapper>{children}</MainWrapper>;
}
