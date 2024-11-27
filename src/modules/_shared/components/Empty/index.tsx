import { CenteredWrapper } from '../Layout/_styles';
import { StyledBud } from '@/modules/404/styles';
import Bud from '@/modules/_shared/assets/pngs/buddy-joint.png';
interface EmptyStateProps {
	text: string;
}

export default function EmptyState({ text }: EmptyStateProps) {
	return (
		<CenteredWrapper>
			<StyledBud src={Bud} alt='Buddy' />
			<h2>{text}</h2>
		</CenteredWrapper>
	);
}
