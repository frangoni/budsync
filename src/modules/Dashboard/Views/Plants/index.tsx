import Header from '@/modules/_shared/components/Layout/Header';
import Toolbar from '@/modules/_shared/components/Layout/Toolbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import AddPlants from './AddPlants';
import useModal from '@/modules/_shared/hooks/useModal';
import Modal from '@/modules/_shared/components/Dialog';
import PlantScanner from './PlantScanner';
import { useNavigate } from 'react-router-dom';
import { PlantsMainContainer } from './_styles';
import PlantFinder from './PlantFinder';
import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';

export default function Plants() {
	const { closeModal, modalRef, openModal } = useModal();
	const navigate = useNavigate();

	const onScan = (result: string | null) => {
		if (result) navigate(`/dashboard/plants/${result}`);
	};

	return (
		<>
			<Header title='Plants' description='Here you can manage your rooms' />
			<Toolbar
				items={[
					{
						icon: <Icon icon='material-symbols-light:potted-plant-outline' />,
						onClick: openModal,
						text: 'Grow plants',
					},
				]}
			/>
			<SectionContainer>
				<PlantsMainContainer>
					<PlantScanner onScan={onScan} />
					<h4>OR</h4>
					<PlantFinder />
				</PlantsMainContainer>
			</SectionContainer>

			<Modal ref={modalRef}>
				<AddPlants onSubmit={() => closeModal()} />
			</Modal>
		</>
	);
}
