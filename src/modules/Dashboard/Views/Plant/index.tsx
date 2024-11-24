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
import PlantStatus from './PlantStatus';
import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';

export default function Plant() {
	const {
		setContentAndOpenModal,
		reprintQR,
		modalRef,
		modalContent,
		closeModal,
		currentPlant,
		plantId,
		COLUMNS,
		isLoading,
		plantRecords,
	} = usePlant();

	return (
		<>
			<Header
				title='Plant'
				subtitle={<PlantStatus active={currentPlant?.active} />}
				description={`Strain: ${currentPlant?.strain.name}`}
				shouldGoBack
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
			<SectionContainer>
				<PlantGallery imgUrls={[]} />
				<AppTable<TRecord>
					columns={COLUMNS}
					title={() => 'Records'}
					dataSource={plantRecords}
					rowKey='id'
					loading={isLoading}
				/>
			</SectionContainer>
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
