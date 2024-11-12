import Header from '@/modules/_shared/components/Layout/Header';
import { TPlant } from '@/redux/reducers/plants';
import { PLANTS_DATA } from './_dummy';
import AppTable from '@/modules/_shared/components/Table';
import Toolbar from '@/modules/_shared/components/Layout/Toolbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import Modal from '@/modules/_shared/components/Dialog';
import AddPlants from '../Plants/AddPlants';
import useRoom from './useRoom';
import Loader from '@/modules/Loading';
import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';

export default function Room() {
	const { isLoading, openModal, reprintQR, selectedRows, rowSelection, modalRef, roomId, closeModal, COLUMNS } =
		useRoom();

	if (isLoading) return <Loader />;
	return (
		<>
			<Header title='Room' description={'Manage room name, add plants or search for active'} shouldGoBack />
			<Toolbar
				items={[
					{
						icon: <Icon icon='material-symbols-light:potted-plant-outline' />,
						onClick: openModal,
						text: 'Grow plants',
					},
					{
						icon: <Icon icon='mdi:qrcode' />,
						onClick: reprintQR,
						text: 'Reprint QR',
						disabled: !selectedRows.length,
					},
				]}
			/>
			<SectionContainer>
				<AppTable<TPlant>
					columns={COLUMNS}
					rowSelection={rowSelection}
					title={() => 'Plants'}
					dataSource={PLANTS_DATA}
					rowKey='id'
				/>
			</SectionContainer>
			<Modal ref={modalRef}>
				<AddPlants roomId={roomId} onSubmit={() => closeModal()} />
			</Modal>
		</>
	);
}
