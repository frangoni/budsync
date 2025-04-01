import { StatsParams, TStatResponse } from '@/redux/reducers/stats';
import * as XLSX from 'xlsx';

export const smartFormatNumber = (value: number | undefined): string => {
	if (value === undefined || isNaN(value)) return '--';

	// Check if the number is an integer
	if (Number.isInteger(value)) {
		return value.toString();
	}

	// Round to 2 decimal places and remove trailing zeros
	const formatted = value.toFixed(2);
	return formatted.replace(/\.?0+$/, '');
};

export const exportToExcel = (stats: TStatResponse, statsParams: StatsParams, fileName: string) => {
	const wb = XLSX.utils.book_new();

	if (!stats) return;

	const paramsDisplay = {
		Active: statsParams.active ? 'Yes' : 'No',
		'Desk ID': statsParams.deskId || 'All',
		'Room ID': statsParams.roomId || 'All',
		'Strain ID': statsParams.strainId || 'All',
		'Start Date': new Date(statsParams.startDate).toLocaleDateString(),
		'End Date': new Date(statsParams.endDate).toLocaleDateString(),
	};
	const paramsArray = Object.entries(paramsDisplay).map(([key, value]) => [key, value]);

	// Add empty row after parameters
	paramsArray.push([], ['Date', 'Temperature', 'Humidity', 'Nutrient']);

	stats.stats.forEach(item => {
		paramsArray.push([item.record_date, item.temperature, item.humidity, item.nutrient]);
	});

	const statsSheet = XLSX.utils.aoa_to_sheet(paramsArray);
	XLSX.utils.book_append_sheet(wb, statsSheet, 'Stats Data');

	const metricsData = [
		{
			Metric: 'Mean',
			Temperature: stats.meanTemperature,
			Humidity: stats.meanHumidity,
			Nutrient: stats.meanNutrient,
		},
		{
			Metric: 'Median',
			Temperature: stats.medianTemperature,
			Humidity: stats.medianHumidity,
			Nutrient: stats.medianNutrient,
		},
		{
			Metric: 'Range',
			Temperature: stats.rangeTemperature,
			Humidity: stats.rangeHumidity,
			Nutrient: stats.rangeNutrient,
		},
	];
	const metricsSheet = XLSX.utils.json_to_sheet(metricsData);
	XLSX.utils.book_append_sheet(wb, metricsSheet, 'Aggregated Metrics');

	XLSX.writeFile(wb, fileName + '.xlsx');
};
