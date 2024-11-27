import useModal from '@/modules/_shared/hooks/useModal';
import { useGetTaskQuery } from '@/redux/reducers/tasks';
import { useNavigate, useParams } from 'react-router-dom';

export default function useTask() {
	const { taskId } = useParams<{ taskId: string }>();
	const navigate = useNavigate();
	const { closeModal, modalRef, openModal } = useModal();
	const { data, isLoading, refetch } = useGetTaskQuery(taskId!);

	const navigateToRecord = () => {
		navigate(`/dashboard/record/${data?.record.id}`);
	};

	const handleFinishTask = async () => {
		refetch();
		closeModal();
	};

	return { isLoading, data, taskId, navigateToRecord, modalRef, openModal, handleFinishTask };
}
