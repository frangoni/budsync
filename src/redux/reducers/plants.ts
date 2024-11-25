import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from '../baseApi';
import { TStrain } from './strains';

export interface TPlant {
	id: number;
	active: boolean;
	number: number;
	totalQ: number;
	roomId: string;
	strain: TStrain;
}

export interface PlantsState {
	plants: TPlant[];
}

export interface TCreatePlants {
	roomId: string;
	amountOfPlants: number;
	strainName: string;
}

const initialState: PlantsState = {
	plants: [],
};

const plantsSlice = createSlice({
	name: 'plants',
	initialState,
	reducers: {
		setPlants: (state, action) => {
			state.plants = action.payload.plants;
		},
	},
});

export const plantsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getPlants: builder.query<TPlant[], void>({
			query: roomId => `/plants/${roomId}`,
			providesTags: ['Plants'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setPlants({ plants: data }));
				} catch (e) {
					console.error(`Error fetching plants:${e}`);
				}
			},
		}),
		getPlant: builder.query<TPlant, string>({
			query: id => `/plant/${id}`,
			providesTags: ['Plants'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setPlants({ plants: [data] }));
				} catch (e) {
					console.error(`Error fetching plant:${e}`);
				}
			},
		}),
		createPlants: builder.mutation({
			query: (plants: TCreatePlants[]) => ({
				url: '/plant/createAll',
				method: 'POST',
				body: plants,
			}),
			invalidatesTags: ['Plants'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setPlants({ plants: data }));
				} catch (e) {
					console.error(`Error creating plants:${e}`);
				}
			},
		}),
		editPlant: builder.mutation({
			query: plant => ({
				url: `/plants/${plant.id}`,
				method: 'PUT',
				body: plant,
			}),
			invalidatesTags: ['Plants'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setPlants({ plants: data }));
				} catch (e) {
					console.error(`Error editing plant:${e}`);
				}
			},
		}),
	}),
});

export const {
	useGetPlantsQuery,
	useGetPlantQuery,
	useLazyGetPlantQuery,
	useCreatePlantsMutation,
	useEditPlantMutation,
} = plantsApi;
export const { setPlants } = plantsSlice.actions;
export const initialPlantsState = initialState;
export default plantsSlice.reducer;
