import Header from '@/modules/_shared/components/Layout/Header';
import RoomCard from './RoomCard';
import { RoomsWrapper } from './_styles';
import Toolbar from '@/modules/_shared/components/Layout/Toolbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import Modal from '@/modules/_shared/components/Dialog';
import AddRoom from './AddRoom';
import useModal from '@/modules/_shared/hooks/useModal';
import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';
import { useGetRoomsQuery } from '@/redux/reducers/rooms';

export default function Rooms() {
	const { data: rooms } = useGetRoomsQuery({ page: 1, size: 10 });
	const { openModal, closeModal, modalRef } = useModal();

	return (
		<>
			<Header title='Rooms' description='Here you can manage your rooms' />
			<Toolbar items={[{ icon: <Icon icon='mdi:house-add-outline' />, onClick: openModal, text: 'Add room' }]} />
			<SectionContainer>
				<RoomsWrapper>
					{rooms?.map(room => {
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
