import { TPlant } from '@/redux/reducers/plants';
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
		dataIndex: 'strain',
		key: 'strain',
		render: (_, plant: TPlant) => <p>{plant.strain.name}</p>,
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
