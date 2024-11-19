import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from '../baseApi';

export interface TParameter {
	minHumidity: number;
	maxHumidity: number;
	minNutrient: number;
	medium: string;
}

export interface ParametersState {
	parameters: TParameter;
}

const initialState: ParametersState = {
	parameters: {
		minHumidity: 0,
		maxHumidity: 0,
		minNutrient: 0,
		medium: '',
	},
};

const parametersSlice = createSlice({
	name: 'parameters',
	initialState,
	reducers: {
		setParameters: (state, action) => {
			state.parameters = action.payload.parameters;
		},
	},
});

export const parametersApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getParameters: builder.query<TParameter, void>({
			query: () => '/parameters',
			providesTags: ['Parameters'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setParameters({ parameters: data }));
				} catch (e) {
					console.error(`Error fetching parameters:${e}`);
				}
			},
		}),
		editParameters: builder.mutation<TParameter, Partial<TParameter>>({
			query: parameters => ({
				url: '/parameters',
				method: 'PUT',
				body: parameters,
			}),
			invalidatesTags: ['Parameters'],
		}),
	}),
});

export const { useGetParametersQuery, useEditParametersMutation } = parametersApi;
export const { setParameters } = parametersSlice.actions;
export default parametersSlice.reducer;
