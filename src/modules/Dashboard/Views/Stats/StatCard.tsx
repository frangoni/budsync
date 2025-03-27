import { Card } from '@/modules/_shared/components/Layout/_styles';
import { Icon } from '@iconify/react/dist/iconify.js';
import { StatLabel, StatValue } from './_styles';

interface StatCardProps {
	statNumber: number;
	statName: string;
	statColor: string;
	statIcon: string;
}

export default function StatCard({ statNumber, statName, statColor, statIcon }: StatCardProps) {
	return (
		<Card>
			<StatLabel style={{ background: statColor }}>{statName}</StatLabel>
			<StatValue>
				<p>{statNumber}</p>
				<Icon icon={statIcon} style={{ fontSize: '3rem' }} />
			</StatValue>
		</Card>
	);
}
