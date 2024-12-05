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
import PlantStatus from '../Plant/PlantStatus';
import PlantImage from '../Plant/PlantImage';
import AddFile from './AddFile';
import AppButton from '@/modules/_shared/components/Button';

export default function Record() {
	const {
		isLoading,
		COLUMNS,
		modalRef,
		recordId,
		openModal,
		recordTasks,
		data,
		handleTaskAdded,
		refetchRecord,
		imageFile,
		handleDeleteFile,
		isDeletingFile,
	} = useRecord();

	if (isLoading) return <Loader />;
	return (
		<>
			<Header title='Record' description='Manage a record and create tasks' shouldGoBack />
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
					{imageFile ? (
						<span>
							<h3>Plant Image</h3>
							<p>Click to expand</p>
							<PlantImgWrapper>
								<PlantImage id={imageFile.id} />
							</PlantImgWrapper>
							<AppButton
								loading={isDeletingFile}
								buttonType='danger'
								text='Delete file'
								onClick={handleDeleteFile}
							/>
						</span>
					) : (
						<span>
							<AddFile recordId={+recordId} onSubmit={refetchRecord} />
						</span>
					)}
					<span>
						<h3>Plant Record</h3>
						<RecordsWrapper>
							<Card>
								<RecordsDetailsWrapper>
									<h4># {data?.plant.id}</h4>
									<p>Plant Status:</p> <PlantStatus active={data?.plant.active} />
									<p>Strain: {data?.plant.strain.name}</p>
									<p>Humidity: {data?.humidity}</p>
									<p>Temperature: {data?.temperature}</p>
									<p>Nutrient: {data?.nutrient}</p>
									<p>Medium: {data?.medium}</p>
									{data?.date && <p>Date: {new Date(data?.date).toLocaleDateString()}</p>}
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
