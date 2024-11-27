import useModal from '@/modules/_shared/hooks/useModal';
import { useGetRecordQuery } from '@/redux/reducers/records';
import { useNavigate, useParams } from 'react-router-dom';
import TASKS_COLUMNS from '../Tasks/_columns';
import AppButton from '@/modules/_shared/components/Button';
import { TTask, useGetTasksByRecordQuery } from '@/redux/reducers/tasks';
import usePagination from '@/modules/_shared/hooks/usePagination';

export default function useRecord() {
	const { closeModal, modalRef, openModal } = useModal();
	const { recordId } = useParams();
	if (!recordId) throw new Error('Record ID not provided');
	const { data, isLoading, isError } = useGetRecordQuery(recordId!);
	const { page, size } = usePagination();
	const { data: recordTasks } = useGetTasksByRecordQuery({ recordId, page, size });
	const navigate = useNavigate();
	const navigateToTask = (taskId: string) => navigate(`/dashboard/tasks/${taskId}`);

	const COLUMNS = [
		...TASKS_COLUMNS,
		{
			title: 'Actions',
			dataIndex: 'actions',
			key: 'actions',
			render: (_: string, task: TTask) => (
				<AppButton onClick={() => navigateToTask(task.id)} buttonType='secondary' text='View details' />
			),
			width: 1,
		},
	];

	return {
		closeModal,
		modalRef,
		openModal,
		recordId,
		data,
		isLoading,
		isError,
		COLUMNS,
		recordTasks,
	};
}
