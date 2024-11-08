import Header from '@/modules/_shared/components/Layout/Header';
import PlantGallery from './PlantGallery';
import Toolbar from '@/modules/_shared/components/Layout/Toolbar';
import Modal from '@/modules/_shared/components/Dialog';
import { Icon } from '@iconify/react/dist/iconify.js';
import usePlant from './usePlant';
import HarvestPlant from './HarvestPlant';
import AddRecord from './AddRecord';
import AppTable from '@/modules/_shared/components/Table';
import { TRecord } from '@/redux/reducers/records';
import { RECORDS_DATA } from './_dummy';
import PlantStatus from './PlantStatus';

export default function Plant() {
	const { setContentAndOpenModal, reprintQR, modalRef, modalContent, closeModal, currentPlant, plantId, COLUMNS } =
		usePlant();

	return (
		<>
			<Header
				title='Plant'
				subtitle={<PlantStatus active={currentPlant?.active} />}
				description='Here you can manage your plant'
			/>
			<Toolbar
				items={[
					{
						icon: <Icon icon='mdi:database-arrow-up-outline' />,
						onClick: () => setContentAndOpenModal('record'),
						text: 'Add record',
					},
					{
						icon: <Icon icon='mdi:qrcode' />,
						onClick: reprintQR,
						text: 'Reprint QR',
					},
					{
						icon: <Icon icon='mdi:compost' />,
						onClick: () => setContentAndOpenModal('crop'),
						text: 'Harvest plant',
					},
				]}
			/>
			<PlantGallery imgUrls={[]} />
			<AppTable<TRecord> columns={COLUMNS} title={() => 'Records'} dataSource={RECORDS_DATA} rowKey='id' />
			<Modal ref={modalRef}>
				{modalContent === 'record' ? (
					<AddRecord onSubmit={closeModal} plantId={plantId} />
				) : (
					<HarvestPlant onSubmit={closeModal} plant={currentPlant} />
				)}
			</Modal>
		</>
	);
}
