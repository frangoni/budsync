import AppButton from '@/modules/_shared/components/Button';
import TASKS_COLUMNS from './_columns';
import { useNavigate } from 'react-router-dom';
import { TTask, useGetMyTasksQuery } from '@/redux/reducers/tasks';

export default function useTasks() {
	const navigate = useNavigate();
	const navigateToTask = (taskId: string) => navigate(`/dashboard/tasks/${taskId}`);
	const { data, isLoading } = useGetMyTasksQuery();

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
		COLUMNS,
		data,
		isLoading,
	};
}
