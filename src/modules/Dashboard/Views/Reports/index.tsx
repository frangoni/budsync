import { CenteredWrapper, SectionContainer } from '@/modules/_shared/components/Layout/_styles';
import Header from '@/modules/_shared/components/Layout/Header';
import { StyledBud } from '@/modules/404/styles';
import Bud from '@/modules/_shared/assets/pngs/buddy-bong.png';

export default function Reports() {
	return (
		<>
			<Header title='Reports' />

			<SectionContainer>
				<CenteredWrapper>
					<h1>Coming soon...</h1>
					<StyledBud src={Bud} alt='Buddy' />
					<p>Reports will be displayed here</p>
				</CenteredWrapper>
			</SectionContainer>
		</>
	);
}
