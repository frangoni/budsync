import { CenteredWrapper } from '@/modules/_shared/components/Layout/_styles';
import Loader from '@/modules/_shared/components/Loading';

export default function ReportLoader() {
	return (
		<CenteredWrapper>
			<Loader />
			<p>Generating report...</p>
		</CenteredWrapper>
	);
}
