import { StatsParams, useLazyGetStatsQuery } from '@/redux/reducers/stats';
import { useState } from 'react';

export default function useStats() {
	const [statsParams, setStatsParams] = useState<StatsParams>({
		active: true,
		deskId: 0,
		roomId: 0,
		strainId: 0,
		startDate: new Date('2025-01-01').getTime(),
		endDate: new Date().getTime(),
	});

	const [getStats, { data: stats, isLoading, error }] = useLazyGetStatsQuery();

	return {
		statsParams,
		setStatsParams,
		getStats,
		stats,
		isLoading,
		error,
	};
}
