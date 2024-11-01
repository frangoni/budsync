import Header from '@/modules/_shared/components/Layout/Header';
import { ROOMS } from './_dummy';
import RoomCard from './RoomCard';
import { RoomsWrapper } from './styles';
import Toolbar from '@/modules/_shared/components/Layout/Toolbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import Modal, { ModalHandle } from '@/modules/_shared/components/Dialog';
import { useRef } from 'react';
import AddRoom from './AddRoom';
export default function Rooms() {
	const modalRef = useRef<ModalHandle>(null);
	const openModal = () => modalRef.current?.open();
	const closeModal = () => modalRef.current?.close();

	return (
		<>
			<Header title='Rooms' description='Here you can manage your rooms' />
			<Toolbar items={[{ icon: <Icon icon='mdi:house-add' />, onClick: openModal, text: 'Add room' }]} />
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
