import useModal from '@/modules/_shared/hooks/useModal';
import { useGetRecordQuery } from '@/redux/reducers/records';
import { useNavigate, useParams } from 'react-router-dom';
import TASKS_COLUMNS from './_columns';
import AppButton from '@/modules/_shared/components/Button';
import { TTask } from '@/redux/reducers/tasks';

export default function useRecord() {
	const { closeModal, modalRef, openModal } = useModal();
	const { recordID } = useParams();
	const { data, isLoading, isError } = useGetRecordQuery(recordID!);
	const navigate = useNavigate();
	const navigateToTask = (taskId: string) => navigate(`/dashboard/tasks/${taskId}`);

	const COLUMNS = [
		...TASKS_COLUMNS,
		{
			title: 'Actions',
			dataIndex: 'actions',
			key: 'actions',
			render: (_: any, task: TTask) => (
				<AppButton onClick={() => navigateToTask(task.id)} buttonType='secondary' text='View details' />
			),
		},
	];

	return {
		closeModal,
		modalRef,
		openModal,
		recordID,
		data,
		isLoading,
		isError,
		COLUMNS,
	};
}
