import { TRecord } from '@/redux/reducers/records';

const RECORDS_COLUMNS = [
	{
		title: '#',
		dataIndex: 'plantId',
		key: 'number',
		render: (plantId: number, record: TRecord) => <span>{record.plant.id}</span>,
		width: 1,
	},
	{
		title: 'Date',
		dataIndex: 'date',
		key: 'date',
		render: (date: string) => new Date(date).toLocaleString(),
	},
	{
		title: 'Humidity',
		dataIndex: 'humidity',
		key: 'humidity',
	},
	{
		title: 'Nutrient',
		dataIndex: 'nutrient',
		key: 'nutrient',
	},
	{
		title: 'Temperature',
		dataIndex: 'temperature',
		key: 'temperature',
	},
	{
		title: 'Min Nutrient',
		dataIndex: 'minNutrient',
		key: 'minNutrient',
	},
	{
		title: 'Min Humidity',
		dataIndex: 'minHumidity',
		key: 'minHumidity',
	},
	{
		title: 'Max Humidity',
		dataIndex: 'maxHumidity',
		key: 'maxHumidity',
	},
	{
		title: 'Medium',
		dataIndex: 'medium',
		key: 'medium',
	},
];

export default RECORDS_COLUMNS;
