import Header from '@/modules/_shared/components/Layout/Header';
import { TPlant } from '@/redux/reducers/plants';
import { PLANTS_DATA } from './_dummy';
import AppTable from '@/modules/_shared/components/Table';
import Toolbar from '@/modules/_shared/components/Layout/Toolbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import Modal from '@/modules/_shared/components/Dialog';
import AddPlants from './AddPlants';
import useRoom from './useRoom';

export default function Room() {
	const { isLoading, openModal, reprintQR, selectedRows, rowSelection, modalRef, roomId, closeModal, COLUMNS } =
		useRoom();

	if (isLoading) return <div>Loading...</div>;
	return (
		<>
			<Header title='Room' description={'Manage room name, add plants or search for active'} shouldGoBack />
			<Toolbar
				items={[
					{ icon: <Icon icon='mdi:add' />, onClick: openModal, text: 'Create plants' },
					{
						icon: <Icon icon='mdi:qrcode' />,
						onClick: reprintQR,
						text: 'Reprint QR',
						disabled: !selectedRows.length,
					},
				]}
			/>
			<AppTable<TPlant>
				columns={COLUMNS}
				rowSelection={rowSelection}
				title={() => 'Plants'}
				dataSource={PLANTS_DATA}
				rowKey='id'
			/>
			<Modal ref={modalRef}>
				<AddPlants roomId={roomId} onSubmit={() => closeModal()} />
			</Modal>
		</>
	);
}
