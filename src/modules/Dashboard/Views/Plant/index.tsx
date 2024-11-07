import Header from '@/modules/_shared/components/Layout/Header';
import PlantGallery from './PlantGallery';
import Toolbar from '@/modules/_shared/components/Layout/Toolbar';
import Modal from '@/modules/_shared/components/Dialog';
import { Icon } from '@iconify/react/dist/iconify.js';
import usePlant from './usePlant';
import HarvestPlant from './HarvestPlant';
import AddRecord from './AddRecord';

export default function Plant() {
	const { setContentAndOpenModal, reprintQR, modalRef, modalContent, closeModal, currentPlant, plantId } = usePlant();
	return (
		<>
			<Header title='Plant' description='Here you can manage your plant' />
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
