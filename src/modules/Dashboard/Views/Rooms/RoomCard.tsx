import AppButton from '@/modules/_shared/components/Button';
import { Card } from '@/modules/_shared/components/Layout/styles';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import { RoomCardLayout } from './_styles';

interface RoomCardProps {
	title: string;
	roomId: string;
	quantity: number;
}

export default function RoomCard({ title, quantity, roomId }: RoomCardProps) {
	const navigate = useNavigate();
	const handleNavigate = () => navigate(`/dashboard/rooms/${roomId}`);

	return (
		<Card>
			<RoomCardLayout>
				<h3>{title}</h3>
				<p>
					Active plants: <b>{quantity}</b>
				</p>
				<AppButton
					iconPosition='end'
					text='See room'
					onClick={handleNavigate}
					icon={<Icon icon={'mdi:navigate-next'} />}
				/>
			</RoomCardLayout>
		</Card>
	);
}
