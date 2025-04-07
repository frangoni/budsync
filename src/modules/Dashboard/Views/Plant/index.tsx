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
import { useParams } from 'react-router-dom';
import EditPlant from './EditPlant';
import PlantStats from './PlantStats';
import Loader from '@/modules/_shared/components/Loading';

function Plant({ plantId }: { plantId: string }) {
	const {
		setContentAndOpenModal,
		reprintQR,
		modalRef,
		modalContent,
		currentPlant,
		COLUMNS,
		plantRecords,
		onEditSuccess,
		onAddRecordSuccess,
		isFetching,
		isLoading,
		isLoadingRecords,
	} = usePlant({ plantId });

	const allFiles = plantRecords?.content.map(record => record.files).flat();

	if (isLoading || isLoadingRecords) return <Loader />;

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
					{
						icon: <Icon icon='mdi:pencil' />,
						onClick: () => setContentAndOpenModal('edit'),
						text: 'Edit plant',
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
					loading={isFetching}
				/>
				<PlantStats />
				<FloatingScanner />
			</SectionContainer>
			<Modal ref={modalRef}>
				{modalContent === 'record' && <AddRecord onSubmit={onAddRecordSuccess} plantId={plantId} />}
				{modalContent === 'crop' && <HarvestPlant onSubmit={onEditSuccess} plant={currentPlant} />}
				{modalContent === 'edit' && <EditPlant onSubmit={onEditSuccess} plant={currentPlant} />}
			</Modal>
		</>
	);
}

export default function PlantWrapper() {
	const { plantId } = useParams();
	if (!plantId) throw new Error('Plant ID is required');
	return <Plant key={plantId} plantId={plantId} />;
}
