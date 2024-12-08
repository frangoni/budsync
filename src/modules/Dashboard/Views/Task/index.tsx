import Header from '@/modules/_shared/components/Layout/Header';
import { TaskDetailsWrapper, TaskMainWrapper } from './_styles';
import Loader from '@/modules/_shared/components/Loading';
import PlantStatus from '../Plant/PlantStatus';
import AppButton from '@/modules/_shared/components/Button';
import Modal from '@/modules/_shared/components/Dialog';
import FinishTask from './FinishTask';
import useTask from './useTask';
import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';

export default function Task() {
	const { handleFinishTask, data, isLoading, openModal, navigateToRecord, modalRef, taskId } = useTask();

	if (isLoading || !data) return <Loader />;

	const { createdBy, assignedTo, record, description, resolvedAt } = data;
	const isResolved = Boolean(resolvedAt);
	return (
		<>
			<Header title='Task' description='See an edit a task' shouldGoBack />
			<SectionContainer>
				<TaskMainWrapper>
					<TaskDetailsWrapper>
						<span className='detail-row'>
							<h5>Task description:</h5>
							<p>{description}</p>
						</span>
						<span className='detail-row'>
							<h5>Created by:</h5>
							<p>
								{createdBy.name} {createdBy.lastName}
							</p>
						</span>
						<span className='detail-row'>
							<h5>Assigned to:</h5>
							<p>
								{assignedTo.name} {assignedTo.lastName}
							</p>
						</span>
						<span className='detail-row'>
							<h5>Status:</h5>
							<PlantStatus active={!isResolved} text={isResolved ? 'Completed' : 'Pending'} />
						</span>
						<AppButton text='Finish task' onClick={openModal} disabled={isResolved} />
					</TaskDetailsWrapper>
					<TaskDetailsWrapper>
						<span className='detail-row'>
							<h5>Record ID:</h5>
							<p>{record.id}</p>
						</span>
						<span className='detail-row'>
							<h5>Humidity:</h5>
							<p>{record.humidity}%</p>
						</span>
						<span className='detail-row'>
							<h5>Nutrient:</h5>
							<p>{record.nutrient}EC</p>
						</span>
						<span className='detail-row'>
							<h5>Temperature:</h5>
							<p>{record.temperature}°C</p>
						</span>
						<span className='detail-row'>
							<h5>Medium:</h5>
							<p>{record.medium}</p>
						</span>
						<AppButton text='Go to record' onClick={navigateToRecord} />
					</TaskDetailsWrapper>
				</TaskMainWrapper>
			</SectionContainer>

			<Modal ref={modalRef}>
				<FinishTask onSubmit={handleFinishTask} taskId={taskId!} />
			</Modal>
		</>
	);
}
