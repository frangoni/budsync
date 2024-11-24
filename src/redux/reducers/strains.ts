import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from '../baseApi';

export interface TStrain {
	id: string;
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
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setStrains({ plants: data }));
				} catch (e) {
					console.error(`Error fetching plants:${e}`);
				}
			},
		}),
		createStrain: builder.mutation({
			query: (strain: TCreateStrain) => ({
				url: '/strains',
				method: 'POST',
				body: strain,
			}),
			invalidatesTags: ['Strains'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setStrains({ strains: data }));
				} catch (e) {
					console.error(`Error creating strain:${e}`);
				}
			},
		}),
	}),
});

export const { useCreateStrainMutation, useGetStrainsQuery } = strainsApi;
export const { setStrains } = strainsSlice.actions;
export default strainsSlice.reducer;
