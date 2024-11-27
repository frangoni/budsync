import Modal from '@/modules/_shared/components/Dialog';
import Header from '@/modules/_shared/components/Layout/Header';
import Toolbar from '@/modules/_shared/components/Layout/Toolbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import AddTask from './AddTask';
import Loader from '@/modules/_shared/components/Loading';
import { ImageDetailsWrapper, PlantImgWrapper, RecordsDetailsWrapper, RecordsWrapper } from './_styles';
import AppTable from '@/modules/_shared/components/Table';
import { TTask } from '@/redux/reducers/tasks';
import useRecord from './useRecord';
import { Card, SectionContainer } from '@/modules/_shared/components/Layout/_styles';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import PlantStatus from '../Plant/PlantStatus';

export default function Record() {
	const { isLoading, COLUMNS, modalRef, recordId, openModal, recordTasks, data, handleTaskAdded } = useRecord();

	if (isLoading) return <Loader />;
	return (
		<>
			<Header title='Record' description='See and manage a record' shouldGoBack />
			<Toolbar
				items={[
					{
						icon: <Icon icon='mdi:calendar-task' />,
						onClick: openModal,
						text: 'Add task',
					},
				]}
			/>
			<SectionContainer>
				<ImageDetailsWrapper>
					<span>
						<h3>Plant Image</h3>
						<p>Click to expand</p>
						<PlantImgWrapper>
							<Zoom classDialog='zoom-dialog'>
								<img src='https://swiperjs.com/demos/images/nature-10.jpg' />
							</Zoom>
						</PlantImgWrapper>
					</span>
					<span>
						<h3>Plant Records</h3>
						<RecordsWrapper>
							<Card>
								<RecordsDetailsWrapper>
									<h4># {recordId}</h4>
									<p>Strain: {data?.plant.strain.name}</p>
									<p>Humidity: {data?.humidity}</p>
									<p>Temperature: {data?.temperature}</p>
									<p>Nutrient: {data?.nutrient}</p>
									<p>Medium: {data?.medium}</p>
									<p>
										Plant Status: <PlantStatus active={data?.plant.active} />
									</p>
								</RecordsDetailsWrapper>
							</Card>
						</RecordsWrapper>
					</span>
				</ImageDetailsWrapper>
				<AppTable<TTask>
					columns={COLUMNS}
					title={() => 'Tasks'}
					dataSource={recordTasks?.content}
					rowKey='id'
					loading={isLoading}
				/>
			</SectionContainer>
			<Modal ref={modalRef}>
				<AddTask onSubmit={handleTaskAdded} recordId={parseInt(recordId!)} />
			</Modal>
		</>
	);
}
