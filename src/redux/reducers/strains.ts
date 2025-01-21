import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from '../baseApi';

export interface TStrain {
	id: number;
	name: string;
}

export interface StrainsState {
	strains: TStrain[];
}

export interface TCreateStrain {
	name: string;
}

const initialState: StrainsState = {
	strains: [],
};

const strainsSlice = createSlice({
	name: 'strains',
	initialState,
	reducers: {
		setStrains: (state, action) => {
			state.strains = action.payload.strains;
		},
	},
});

export const strainsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getStrains: builder.query<TStrain[], void>({
			query: () => `/strain`,
			providesTags: ['Strains'],
		}),
		createStrain: builder.mutation({
			query: (strain: TCreateStrain) => ({
				url: '/strains',
				method: 'POST',
				body: strain,
			}),
			invalidatesTags: ['Strains'],
		}),
	}),
});

export const { useCreateStrainMutation, useGetStrainsQuery } = strainsApi;
export const { setStrains } = strainsSlice.actions;
export const initialStrainsState = initialState;
export default strainsSlice.reducer;
