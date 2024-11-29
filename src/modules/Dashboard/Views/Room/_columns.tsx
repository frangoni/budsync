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
		render: (_: null, plant: TPlant) => <p>{plant.strain.name}</p>,
	},
	{
		title: 'Status',
		dataIndex: 'active',
		key: 'active',
		render: (active: boolean) => (
			<StatusBadge active={active.toString()}>{active ? 'Active' : 'Inactive'}</StatusBadge>
		),
	},
	{
		title: 'Total quantity',
		dataIndex: 'totalQ',
		key: 'totalQ',
		render: (totalQ: number) => {
			return totalQ ? <p>{totalQ}grs</p> : <p>Still growing</p>;
		},
	},
];

export default PLANT_COLUMNS;
