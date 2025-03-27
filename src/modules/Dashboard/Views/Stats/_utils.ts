export function getSixMonthsFromToday() {
	const today = new Date();
	const sixMonthsFromToday = new Date(today.setMonth(today.getMonth() - 6));

	return sixMonthsFromToday.getTime();
}

export function formatTimestampToDateInput(timestamp: number) {
	return new Date(timestamp).toISOString().split('T')[0];
}
