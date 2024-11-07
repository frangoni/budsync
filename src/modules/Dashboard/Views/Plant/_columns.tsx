const RECORDS_COLUMNS = [
	{
		title: 'Plant Id',
		dataIndex: 'plantId',
		key: 'number',
	},
	{
		title: 'Date',
		dataIndex: 'timestamp',
		key: 'timestamp',
		render: (timestamp: string) => new Date(timestamp).toLocaleString(),
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
