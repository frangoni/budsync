import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from '../baseApi';

export interface TParameter {
	minHumidity: number;
	maxHumidity: number;
	minNutrient: number;
	medium: string;
}

const initialState: TParameter = {
	minHumidity: 0,
	maxHumidity: 0,
	minNutrient: 0,
	medium: '',
};

const parametersSlice = createSlice({
	name: 'parameters',
	initialState,
	reducers: {
		setParameters: (state, action) => {
			state.minHumidity = action.payload.minHumidity;
			state.maxHumidity = action.payload.maxHumidity;
			state.minNutrient = action.payload.minNutrient;
			state.medium = action.payload.medium;
		},
	},
});

export const parametersApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getParameters: builder.query<TParameter[], void>({
			query: () => '/parameters',
			providesTags: ['Parameters'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setParameters(data[0]));
				} catch (e) {
					console.error(`Error fetching parameters:${e}`);
				}
			},
		}),
		editParameters: builder.mutation<TParameter, Partial<TParameter>>({
			query: parameters => ({
				url: '/parameters',
				method: 'POST',
				body: { id: 0, ...parameters },
			}),
			invalidatesTags: ['Parameters'],
		}),
	}),
});

export const { useGetParametersQuery, useEditParametersMutation } = parametersApi;
export const { setParameters } = parametersSlice.actions;
export const initialParametersState = initialState;
export default parametersSlice.reducer;
