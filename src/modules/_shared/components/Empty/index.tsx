import { CenteredWrapper } from '../Layout/_styles';
import { StyledBud } from '@/modules/404/styles';
import BuddyJoint from '@/modules/_shared/assets/pngs/buddy-joint.png';
import BuddyBong from '@/modules/_shared/assets/pngs/buddy-bong.png';
import BuddyBigJoint from '@/modules/_shared/assets/pngs/buddy-big-joint.png';
import LeafyJoint from '@/modules/_shared/assets/pngs/leafy-joint.png';

interface EmptyStateProps {
	text: string;
	imgOption?: 'buddy-joint' | 'buddy-bong' | 'buddy-big-joint' | 'leafy-joint';
}

const imageMap = {
	'buddy-joint': BuddyJoint,
	'buddy-bong': BuddyBong,
	'buddy-big-joint': BuddyBigJoint,
	'leafy-joint': LeafyJoint,
};

export default function EmptyState({ text, imgOption }: EmptyStateProps) {
	const src = imageMap[imgOption || 'buddy-joint'];
	return (
		<CenteredWrapper>
			<StyledBud src={src} alt='Buddy' loading='lazy' />
			<h2>{text}</h2>
		</CenteredWrapper>
	);
}
