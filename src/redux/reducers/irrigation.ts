import { createSlice } from '@reduxjs/toolkit';
import { baseApi, PaginationResponse } from '../baseApi';
import { PaginationOptions } from './pagination';

export interface TIrrigation {
	entryEC: number;
	entryPH: number;
	fertilizer: string;
	milliliters: number;
	runoffEC: number;
	runoffPH: number;
	shotsQ: number;
	plantIds: number[];
}

export interface IrrigationsState {
	irrigations: TIrrigation[];
}

const initialState: IrrigationsState = {
	irrigations: [],
};

const irrigationsSlice = createSlice({
	name: 'irrigations',
	initialState,
	reducers: {
		setIrrigations: (state, action) => {
			state.irrigations = action.payload.irrigations;
		},
	},
});

export const irrigationsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getIrrigationsByPlant: builder.query<PaginationResponse<TIrrigation>, PaginationOptions & { plantId: string }>({
			query: params => `/irrigation/${params.plantId}/${params.page}/${params.size}`,
			providesTags: ['Irrigations'],
		}),
		createIrrigation: builder.mutation<TIrrigation, Partial<TIrrigation>>({
			query: irrigation => ({
				url: `/irrigation/all`,
				method: 'POST',
				body: irrigation,
			}),
			invalidatesTags: ['Irrigations'],
		}),
	}),
});

export const { useCreateIrrigationMutation, useGetIrrigationsByPlantQuery } = irrigationsApi;
export const { setIrrigations } = irrigationsSlice.actions;
export const initialIrrigationsState = initialState;
export default irrigationsSlice.reducer;
