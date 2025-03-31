export function getSixMonthsFromToday() {
	const today = new Date();
	const sixMonthsFromToday = new Date(today.setMonth(today.getMonth() - 6));

	return sixMonthsFromToday.getTime();
}

export function formatTimestampToDateInput(timestamp: number) {
	return new Date(timestamp).toISOString().split('T')[0];
}

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
