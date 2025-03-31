import { StatsParams, useLazyGetStatsQuery } from '@/redux/reducers/stats';
import { useState } from 'react';
import { usePDF } from 'react-to-pdf';

export default function useStats() {
	//	const { statParams } = useAppSelector(state => state.stats);

	const [statsParams, setStatsParams] = useState<StatsParams>({
		active: true,
		deskId: 0,
		roomId: 0,
		strainId: 0,
		startDate: new Date('2025-01-01').getTime(),
		endDate: new Date().getTime(),
	});

	const [getStats, { data: stats, error, isFetching, isUninitialized }] = useLazyGetStatsQuery();

	const { toPDF, targetRef: pdfRef } = usePDF({
		filename: `${new Date().toLocaleDateString()} Budsync KPIs.pdf`,
		page: {},
	});

	return {
		statsParams,
		setStatsParams,
		getStats,
		stats,
		error,
		toPDF,
		pdfRef,
		isFetching,
		isUninitialized,
	};
}
