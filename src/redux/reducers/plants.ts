import { createSlice } from '@reduxjs/toolkit';
import { baseApi, PaginationResponse } from '../baseApi';
import { TStrain } from './strains';
import { PaginationOptions } from './pagination';
import { TDesk } from './desks';

export interface TPlant {
	id: number;
	active: boolean;
	totalQ: number;
	desk: TDesk;
	strain: TStrain;
}

export interface TEditPlant {
	active: boolean;
	deskId: number;
	id: number;
	strainId: number;
	totalQ: number;
}

export type TPlantStatus = 'plants' | 'activePlants' | 'inactivePlants';

export interface PlantsState {
	plants: TPlant[];
}

export interface TCreatePlants {
	deskId: string;
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
		}),
		getPlantsByRoom: builder.query<
			PaginationResponse<TPlant>,
			PaginationOptions & { id: number; status: TPlantStatus }
		>({
			query: params => `/room/${params.id}/${params.status}/${params.page}/${params.size}`,
			providesTags: ['Plants'],
		}),
		getPlantsByDesk: builder.query<
			PaginationResponse<TPlant>,
			PaginationOptions & { id: number; status: TPlantStatus }
		>({
			query: params => `/room/desk/${params.id}/${params.status}/${params.page}/${params.size}`,
			providesTags: ['Plants'],
		}),
		getPlant: builder.query<TPlant, string>({
			query: id => `/plant/${id}`,
			providesTags: ['Plants'],
		}),
		createPlants: builder.mutation({
			query: (plants: TCreatePlants[]) => ({
				url: '/plant/createAll',
				method: 'POST',
				body: plants,
			}),
			invalidatesTags: ['Plants'],
		}),
		editPlant: builder.mutation({
			query: (plant: TEditPlant) => ({
				url: `/plant`,
				method: 'PUT',
				body: plant,
			}),
			invalidatesTags: ['Plants'],
		}),
	}),
});

export const {
	useGetPlantsQuery,
	useGetPlantQuery,
	useLazyGetPlantQuery,
	useCreatePlantsMutation,
	useEditPlantMutation,
	useGetPlantsByRoomQuery,
	useGetPlantsByDeskQuery,
	useLazyGetPlantsByDeskQuery,
} = plantsApi;
export const { setPlants } = plantsSlice.actions;
export const initialPlantsState = initialState;
export default plantsSlice.reducer;
