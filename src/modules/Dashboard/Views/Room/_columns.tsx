import { StatusBadge } from './_styles';

const PLANT_COLUMNS = [
	{
		title: '#',
		dataIndex: 'id',
		key: 'number',
		width: 1,
	},
	{
		title: 'Strain',
		dataIndex: 'strainId',
		key: 'strain',
	},
	{
		title: 'Status',
		dataIndex: 'active',
		key: 'quantity',
		render: (active: boolean) => (
			<StatusBadge active={active.toString()}>{active ? 'Active' : 'Inactive'}</StatusBadge>
		),
	},
];

export default PLANT_COLUMNS;
