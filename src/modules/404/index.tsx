import Bud from '../_shared/assets/webp/bud.webp';
import { StyledBud } from './styles';
import { CenteredWrapper } from '../_shared/components/Layout/styles';
import { useNavigate } from 'react-router-dom';
import AppButton from '../_shared/components/Button';

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<CenteredWrapper>
			<h1>404</h1>
			<StyledBud src={Bud} alt='Bud smoking joint' />
			<p>The page you are looking is not available</p>
			<div className='spacer-24'></div>
			<AppButton text='Go back' onClick={() => navigate(-1)} />
		</CenteredWrapper>
	);
}
