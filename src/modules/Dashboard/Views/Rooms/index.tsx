import Header from '@/modules/_shared/components/Layout/Header';
import { ROOMS } from './_dummy';
import RoomCard from './RoomCard';
import { RoomsWrapper } from './_styles';
import Toolbar from '@/modules/_shared/components/Layout/Toolbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import Modal from '@/modules/_shared/components/Dialog';
import AddRoom from './AddRoom';
import useModal from '@/modules/_shared/hooks/useModal';

export default function Rooms() {
	const { openModal, closeModal, modalRef } = useModal();

	return (
		<>
			<Header title='Rooms' description='Here you can manage your rooms' />
			<Toolbar items={[{ icon: <Icon icon='mdi:house-add-outline' />, onClick: openModal, text: 'Add room' }]} />
			<RoomsWrapper>
				{ROOMS.map(room => {
					const { quantity, id, title } = room;
					return <RoomCard quantity={quantity} roomId={id} key={id} title={title} />;
				})}
			</RoomsWrapper>

			<Modal ref={modalRef}>
				<AddRoom onSubmit={() => closeModal()} />
			</Modal>
		</>
	);
}
