import AppButton from '@/modules/_shared/components/Button';
import TASKS_COLUMNS from './_columns';
import { useNavigate } from 'react-router-dom';
import { TTask, TTaskType, useGetAllTasksQuery } from '@/redux/reducers/tasks';
import usePagination from '@/modules/_shared/hooks/usePagination';
import { useState } from 'react';
import { RadioChangeEvent } from 'antd';
import { useAppSelector } from '@/redux/store';

export default function useTasks() {
	const navigate = useNavigate();
	const navigateToTask = (taskId: string) => navigate(`/dashboard/tasks/${taskId}`);
	const { page, size } = usePagination();
	const [tasksType, setTasksType] = useState<TTaskType>('assignedUser');
	const { currentUser } = useAppSelector(({ users }) => users);
	if (!currentUser) throw new Error('User not found');
	const { data, isLoading } = useGetAllTasksQuery({ page, size, type: tasksType, id: currentUser?.id });

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

	const options = [
		{ label: 'Assigned to me', value: 'assignedUser' },
		{ label: 'Created by me', value: 'createdByUser' },
	];

	const setTaskType = ({ target: { value } }: RadioChangeEvent) => {
		setTasksType(value);
	};

	return {
		COLUMNS,
		data,
		isLoading,
		tasksType,
		setTaskType,
		options,
	};
}
