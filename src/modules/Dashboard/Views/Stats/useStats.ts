import { StatsParams, useLazyGetStatsQuery } from '@/redux/reducers/stats';
import { useState } from 'react';
import { usePDF } from 'react-to-pdf';
import { exportToExcel } from '@/modules/Dashboard/Views/Stats/_utils';

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

	const fileName = `${new Date().toLocaleDateString()} Budsync KPIs`;

	const { toPDF, targetRef: pdfRef } = usePDF({
		filename: fileName + '.pdf',
		page: {},
	});

	const toExcel = () => {
		if (!stats) return;
		exportToExcel(stats, statsParams, fileName + '.xlsx');
	};

	return {
		statsParams,
		setStatsParams,
		getStats,
		stats,
		error,
		toPDF,
		toExcel,
		pdfRef,
		isFetching,
		isUninitialized,
	};
}
