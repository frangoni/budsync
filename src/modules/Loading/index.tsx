import { CenteredWrapper } from '../_shared/components/Layout/_styles';
import { LoaderWrapper } from './_styles';

export default function Loader() {
	return (
		<CenteredWrapper>
			<LoaderWrapper>
				<div className='loader' />
			</LoaderWrapper>
		</CenteredWrapper>
	);
}
