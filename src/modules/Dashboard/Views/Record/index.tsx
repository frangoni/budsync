import Modal from '@/modules/_shared/components/Dialog';
import Header from '@/modules/_shared/components/Layout/Header';
import Toolbar from '@/modules/_shared/components/Layout/Toolbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import AddTask from './AddTask';
import Loader from '@/modules/Loading';
import { ExpandedImage, ImageDetailsWrapper, PlantImgWrapper, RecordsWrapper } from './_styles';
import AppTable from '@/modules/_shared/components/Table';
import { TTask } from '@/redux/reducers/tasks';
import useRecord from './useRecord';
import { TASKS_DATA } from './_dummy';
import { Card } from '@/modules/_shared/components/Layout/styles';
import Zoom from 'react-medium-image-zoom'; // Import the zoom library
import 'react-medium-image-zoom/dist/styles.css'; // Import zoom

export default function Record() {
	const { isLoading, COLUMNS, modalRef, recordID, closeModal, openModal } = useRecord();

	if (isLoading) return <Loader />;
	return (
		<>
			<Header title='Record' description='See and manage a record' />
			<Toolbar
				items={[
					{
						icon: <Icon icon='mdi:calendar-task' />,
						onClick: openModal,
						text: 'Add task',
					},
				]}
			/>

			<ImageDetailsWrapper>
				<span>
					<h3>Plant Image</h3>
					<p>Click to expand</p>
					<PlantImgWrapper>
						<Zoom>
							<img src='https://swiperjs.com/demos/images/nature-10.jpg' />
						</Zoom>
					</PlantImgWrapper>
				</span>
				<span>
					<h3>Plant Records</h3>
					<RecordsWrapper>
						<Card>Plant ID: {recordID}</Card>
						<Card>Plant Type: Tomato</Card>
						<Card>Plant Age: 2 months</Card>
						<Card>Plant Status: Active</Card>
					</RecordsWrapper>
				</span>
			</ImageDetailsWrapper>
			<AppTable<Partial<TTask>> columns={COLUMNS} title={() => 'Tasks'} dataSource={TASKS_DATA} rowKey='id' />
			<Modal ref={modalRef}>
				<AddTask onSubmit={() => closeModal()} recordId={recordID} />
			</Modal>
		</>
	);
}
