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
import FloatingScanner from '../Plants/FloatingScanner';

export default function Plant() {
	const {
		setContentAndOpenModal,
		reprintQR,
		modalRef,
		modalContent,
		currentPlant,
		plantId,
		COLUMNS,
		isLoading,
		plantRecords,
		onEditSuccess,
		onAddRecordSuccess,
	} = usePlant();

	const allFiles = plantRecords?.content.map(record => record.files).flat();

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
						disabled: !currentPlant?.active,
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
						disabled: !currentPlant?.active,
					},
				]}
			/>
			<SectionContainer>
				<PlantGallery files={allFiles} />
				<AppTable<TRecord>
					columns={COLUMNS}
					title={() => 'Records'}
					dataSource={plantRecords?.content}
					rowKey='id'
					loading={isLoading}
				/>
				<FloatingScanner />
			</SectionContainer>
			<Modal ref={modalRef}>
				{modalContent === 'record' && <AddRecord onSubmit={onAddRecordSuccess} plantId={plantId} />}
				{modalContent === 'crop' && <HarvestPlant onSubmit={onEditSuccess} plant={currentPlant} />}
			</Modal>
		</>
	);
}
