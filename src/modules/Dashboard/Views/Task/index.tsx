import Header from '@/modules/_shared/components/Layout/Header';
import { TaskDetailsWrapper, TaskMainWrapper } from './_styles';
import Loader from '@/modules/Loading';
import PlantStatus from '../Plant/PlantStatus';
import AppButton from '@/modules/_shared/components/Button';
import Modal from '@/modules/_shared/components/Dialog';
import FinishTask from './FinishTask';
import useTask from './useTask';
import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';

export default function Task() {
	const { closeModal, data, isLoading, openModal, navigateToRecord, modalRef, taskId } = useTask();

	if (isLoading) return <Loader />;

	return (
		<>
			<Header title='Task' description='See all assigned tasks' shouldGoBack />
			<SectionContainer>
				<TaskMainWrapper>
					<TaskDetailsWrapper>
						<span className='detail-row'>
							<h5>Task description:</h5>
							<p>{data?.description}</p>
						</span>
						<span className='detail-row'>
							<h5>Created by:</h5>
							<p>{data?.createdBy}</p>
						</span>
						<span className='detail-row'>
							<h5>Assigned to:</h5>
							<p>{data?.assignedTo}</p>
						</span>
						<span className='detail-row'>
							<h5>Status:</h5>
							<PlantStatus active={data?.active} />
						</span>
						<AppButton text='Finish task' onClick={openModal} />
					</TaskDetailsWrapper>

					<TaskDetailsWrapper>
						<span className='detail-row'>
							<h5>Record ID:</h5>
							<p>{data?.recordId}</p>
						</span>
						<AppButton text='Go to record' onClick={navigateToRecord} />
					</TaskDetailsWrapper>
				</TaskMainWrapper>
			</SectionContainer>

			<Modal ref={modalRef}>
				<FinishTask onSubmit={() => closeModal()} taskId={taskId!} />
			</Modal>
		</>
	);
}
