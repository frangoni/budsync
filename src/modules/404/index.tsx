import Bud from '../_shared/assets/pngs/leafy-joint.png';
import { StyledBud } from './styles';
import { CenteredWrapper } from '../_shared/components/Layout/styles';
import { useNavigate } from 'react-router-dom';
import AppButton from '../_shared/components/Button';

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<CenteredWrapper>
			<h1>Page not found</h1>
			<div className='spacer-24' />
			<StyledBud src={Bud} alt='Bud smoking joint' />
			<div className='spacer-24' />
			<p>The page you are looking is not available</p>
			<div className='spacer-24' />
			<AppButton text='Go back' onClick={() => navigate(-1)} />
		</CenteredWrapper>
	);
}
