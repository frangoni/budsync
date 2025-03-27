import { useCallback } from 'react';
import { StatsParams } from '@/redux/reducers/stats';
import { useGetRoomsQuery } from '@/redux/reducers/rooms';
import { useLazyGetAllDesksQuery } from '@/redux/reducers/desks';
import { useGetStrainsQuery } from '@/redux/reducers/strains';
import { StatsFiltersProps } from './StatsFilters';
import dayjs from 'dayjs';

export default function useStatsFilters({
	statsParams,
	setStatsParams,
}: Pick<StatsFiltersProps, 'statsParams' | 'setStatsParams'>) {
	const { data: rooms, isLoading: loadingRooms } = useGetRoomsQuery(
		{ page: 0, size: -1 },
		{ refetchOnMountOrArgChange: true }
	);
	const { data: strains, isLoading: loadingStrains } = useGetStrainsQuery();
	const [getAllDesks, { data: desks, isLoading: loadingDesks }] = useLazyGetAllDesksQuery();

	const updateStatsParams = useCallback(
		(newParams: Partial<StatsParams>) => {
			const updatedParams = { ...statsParams, ...newParams };
			setStatsParams(updatedParams);
		},
		[setStatsParams, statsParams]
	);
	const handleDesksFetch = useCallback(
		(roomId: number) => {
			if (!roomId) {
				updateStatsParams({ roomId: 0, deskId: 0 });
				return;
			}
			updateStatsParams({ roomId });
			getAllDesks({ roomId, page: 0, size: -1 });
		},
		[getAllDesks, updateStatsParams]
	);

	const handleDateChange = (
		dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null,
		dateStrings: [string, string]
	) => {
		if (!dates || dates.some(date => date === null)) return;
		const [startDate, endDate] = dateStrings;
		updateStatsParams({
			startDate: new Date(startDate).getTime(),
			endDate: new Date(endDate).getTime(),
		});
	};

	return {
		statsParams,
		updateStatsParams,
		loadingRooms,
		rooms,
		handleDesksFetch,
		loadingDesks,
		desks,
		strains,
		loadingStrains,
		handleDateChange,
	};
}
