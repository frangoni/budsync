import { TTask } from '@/redux/reducers/tasks';

const TASKS_COLUMNS = [
	{
		title: '#',
		dataIndex: 'id',
		key: 'id',
		width: 1,
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
	},
	{
		title: 'Created at',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (date: string) => new Date(date).toLocaleDateString(),
	},

	{
		title: 'Assigned to',
		dataIndex: 'assignedTo',
		key: 'assignedTo',
		render(_: string, task: TTask) {
			return task.assignedTo.name;
		},
	},
	{
		title: 'Created by',
		dataIndex: 'createdBy',
		key: 'createdBy',
		render(_: string, task: TTask) {
			return task.createdBy.name;
		},
	},
	{
		title: 'Finished at',
		dataIndex: 'resolvedAt',
		key: 'resolvedAt',
		render: (date: string) => date && new Date(date).toLocaleDateString(),
	},
];

export default TASKS_COLUMNS;
