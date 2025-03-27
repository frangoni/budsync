import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from '../baseApi';

export interface TStat {
	date: string;
	meanTemperature: number;
	medianTemperature: number;
	rangeTemperature: number;
	meanNutrient: number;
	medianNutrient: number;
	rangeNutrient: number;
	meanHumidity: number;
	medianHumidity: number;
	rangeHumidity: number;
}

export interface StatsState {
	stats: TStat[];
}

const initialState: StatsState = {
	stats: [],
};

const statsSlice = createSlice({
	name: 'stats',
	initialState,
	reducers: {
		setStats: (state, action) => {
			state.stats = action.payload.stats;
		},
	},
});

export interface StatsParams {
	active: boolean;
	deskId: number;
	roomId: number;
	strainId: number;
	startDate: number;
	endDate: number;
}
export const statsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getStats: builder.query<TStat[], StatsParams>({
			query: params =>
				`/dashboard/stats?active=${params.active}&deskId=${params.deskId}&roomId=${params.roomId}&strainId=${params.strainId}&startDate=${params.startDate}&endDate=${params.endDate}`,
			providesTags: ['Stats'],
		}),
	}),
});

export const { useGetStatsQuery, useLazyGetStatsQuery } = statsApi;
export const { setStats } = statsSlice.actions;
export const initialStatsState = initialState;
export default statsSlice.reducer;
