import useModal from '@/modules/_shared/hooks/useModal';
import { useDeleteFileFromRecordMutation, useGetRecordQuery } from '@/redux/reducers/records';
import { useNavigate, useParams } from 'react-router-dom';
import TASKS_COLUMNS from '../Tasks/_columns';
import AppButton from '@/modules/_shared/components/Button';
import { TTask, useGetTasksByRecordQuery } from '@/redux/reducers/tasks';
import usePagination from '@/modules/_shared/hooks/usePagination';
import useNotification from '@/modules/_shared/hooks/useNotification';

export default function useRecord() {
	const notification = useNotification();
	const { closeModal, modalRef, openModal } = useModal();
	const { recordId } = useParams();
	if (!recordId) throw new Error('Record ID not provided');
	const { data, isLoading, isError, refetch: refetchRecord } = useGetRecordQuery(recordId!);
	const { page, size } = usePagination();
	const [deleteFile, { isLoading: isDeletingFile }] = useDeleteFileFromRecordMutation();
	const { data: recordTasks, refetch } = useGetTasksByRecordQuery(
		{ recordId, page, size },
		{ refetchOnMountOrArgChange: true }
	);

	const imageFile = data?.files[0];

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

	const handleTaskAdded = () => {
		refetch();
		closeModal();
	};

	const handleDeleteFile = async () => {
		if (!imageFile?.id) return;
		const deletedFile = await deleteFile({ fileId: imageFile.id });

		if (deletedFile.error) {
			notification.error({ message: 'Error deleting file' });
			return;
		} else {
			notification.success({ message: 'File deleted successfully' });
			refetchRecord();
		}
	};

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
		handleTaskAdded,
		refetchRecord,
		imageFile,
		handleDeleteFile,
		isDeletingFile,
	};
}
