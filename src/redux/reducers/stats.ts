import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from '../baseApi';

export interface TStatData {
	humidity: number;
	nutrient: number;
	record_date: string;
	temperature: number;
}
export interface TStatResponse {
	meanHumidity: number;
	meanNutrient: number;
	meanTemperature: number;
	medianHumidity: number;
	medianNutrient: number;
	medianTemperature: number;
	rangeHumidity: number;
	rangeNutrient: number;
	rangeTemperature: number;
	stats: TStatData[];
}

export interface StatsState {
	stats: TStatResponse[];
	statParams: StatsParams;
}

const initialState: StatsState = {
	stats: [],
	statParams: {
		active: true,
		deskId: 0,
		roomId: 0,
		strainId: 0,
		startDate: new Date('2025-01-01').getTime(),
		endDate: new Date().getTime(),
	},
};

const statsSlice = createSlice({
	name: 'stats',
	initialState,
	reducers: {
		setStats: (state, action) => {
			state.stats = action.payload.stats;
		},
		setStatParams: (state, action) => {
			const updatedParams = { ...state.statParams, ...action.payload };
			state.statParams = updatedParams;
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
		getStats: builder.query<TStatResponse, StatsParams>({
			query: params =>
				`/dashboard/stats?active=${params.active}&deskId=${params.deskId}&roomId=${params.roomId}&strainId=${params.strainId}&startDate=${params.startDate}&endDate=${params.endDate}`,
			providesTags: ['Stats'],
		}),
		getPlantStats: builder.query<TStatResponse, string>({
			query: plantId =>
				`/dashboard/stats/plant/${plantId}?startDate=${new Date(
					'2020-01-01'
				).getTime()}&endDate=${new Date().getTime()}`,
			providesTags: ['Stats'],
		}),
	}),
});

export const { useGetStatsQuery, useLazyGetStatsQuery, useGetPlantStatsQuery } = statsApi;
export const { setStats, setStatParams } = statsSlice.actions;
export const initialStatsState = initialState;
export default statsSlice.reducer;
