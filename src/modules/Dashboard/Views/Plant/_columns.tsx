import { TRecord } from '@/redux/reducers/records';

const RECORDS_COLUMNS = [
	{
		title: '#',
		dataIndex: 'plantId',
		key: 'number',
		render: (_: number, record: TRecord) => <span>{record.plant.id}</span>,
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
		render: (humidity: number) => `${humidity}%`,
	},
	{
		title: 'Nutrient',
		dataIndex: 'nutrient',
		key: 'nutrient',
		render: (nutrient: number) => `${nutrient}EC`,
	},
	{
		title: 'Temperature',
		dataIndex: 'temperature',
		key: 'temperature',
		render: (temperature: number) => `${temperature}°C`,
	},
	{
		title: 'Min Nutrient',
		dataIndex: 'minNutrient',
		key: 'minNutrient',
		render: (minNutrient: number) => `${minNutrient}EC`,
	},
	{
		title: 'Max Nutrient',
		dataIndex: 'maxNutrient',
		key: 'maxNutrient',
		render: (maxNutrient: number) => `${maxNutrient}EC`,
	},
	{
		title: 'Min Humidity',
		dataIndex: 'minHumidity',
		key: 'minHumidity',
		render: (minHumidity: number) => `${minHumidity}%`,
	},
	{
		title: 'Max Humidity',
		dataIndex: 'maxHumidity',
		key: 'maxHumidity',
		render: (maxHumidity: number) => `${maxHumidity}%`,
	},
	{
		title: 'Medium',
		dataIndex: 'medium',
		key: 'medium',
	},
];

export default RECORDS_COLUMNS;
