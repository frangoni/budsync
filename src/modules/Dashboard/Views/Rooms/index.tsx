import Header from '@/modules/_shared/components/Layout/Header';
import { ROOMS } from './dummy';
import RoomCard from './RoomCard';
import { RoomsWrapper } from './styles';

export default function Rooms() {
	return (
		<div>
			<Header title='Rooms' description='Here you can manage your rooms' />
			<RoomsWrapper>
				{ROOMS.map(room => {
					const { quantity, id, title } = room;
					return <RoomCard quantity={quantity} roomId={id} key={id} title={title} />;
				})}
			</RoomsWrapper>
		</div>
	);
}
