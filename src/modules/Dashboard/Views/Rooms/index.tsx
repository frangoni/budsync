import Header from '@/modules/_shared/components/Layout/Header';
import RoomCard from './RoomCard';
import { RoomsWrapper } from './_styles';
import Toolbar from '@/modules/_shared/components/Layout/Toolbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import Modal from '@/modules/_shared/components/Dialog';
import AddRoom from './AddRoom';
import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';
import useRooms from './useRooms';

export default function Rooms() {
	const { rooms, modalRef, closeModal, openModal } = useRooms();

	return (
		<>
			<Header title='Rooms' description='Here you can manage your rooms' />
			<Toolbar items={[{ icon: <Icon icon='mdi:house-add-outline' />, onClick: openModal, text: 'Add room' }]} />
			<SectionContainer>
				<RoomsWrapper>
					{rooms?.content.map(room => {
						const { id, name } = room;
						return <RoomCard quantity={1} roomId={id} key={id} title={name} />;
					})}
				</RoomsWrapper>
			</SectionContainer>

			<Modal ref={modalRef}>
				<AddRoom onSubmit={() => closeModal()} />
			</Modal>
		</>
	);
}
