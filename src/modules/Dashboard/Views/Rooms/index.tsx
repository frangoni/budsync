import Header from '@/modules/_shared/components/Layout/Header';
import RoomCard from './RoomCard';
import { RoomsWrapper } from './_styles';
import Toolbar from '@/modules/_shared/components/Layout/Toolbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import Modal from '@/modules/_shared/components/Dialog';
import AddRoom from './AddRoom';
import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';
import useRooms from './useRooms';
import Loader from '@/modules/_shared/components/Loading';
import EmptyState from '@/modules/_shared/components/Empty';

export default function Rooms() {
	const { rooms, modalRef, openModal, isLoading, addRoomSuccess } = useRooms();

	if (isLoading) return <Loader />;
	return (
		<>
			<Header title='Rooms' description='Manage your rooms' />
			<Toolbar items={[{ icon: <Icon icon='mdi:house-add-outline' />, onClick: openModal, text: 'Add room' }]} />
			<SectionContainer>
				{rooms?.content.length ? (
					<RoomsWrapper>
						{rooms.content.map(({ room, activePlants }) => {
							console.log('activePlants :', activePlants);
							const { id, name } = room;
							return <RoomCard quantity={activePlants} roomId={id} key={id} title={name} />;
						})}
					</RoomsWrapper>
				) : (
					<EmptyState text='No rooms found' />
				)}
			</SectionContainer>

			<Modal ref={modalRef}>
				<AddRoom onSubmit={addRoomSuccess} />
			</Modal>
		</>
	);
}
