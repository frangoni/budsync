import { CenteredWrapper } from '../Layout/_styles';
import { StyledBud } from '@/modules/404/styles';
import Bud from '@/modules/_shared/assets/pngs/leafy-joint.png';
import AppButton from '../Button';

export default function ErrorElement() {
	const refreshPage = () => window.location.reload();

	return (
		<CenteredWrapper>
			<StyledBud src={Bud} alt='Buddy' />
			<h3>Oops! Didn't saw that coming :(</h3>
			<div className='spacer-24' />
			<AppButton text='Refresh' onClick={refreshPage} />
		</CenteredWrapper>
	);
}
