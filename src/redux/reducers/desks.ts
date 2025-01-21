import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from '../baseApi';
import { PaginationOptions } from './pagination';
import { TRoom } from './rooms';

export interface TDesk {
	id: number;
	name: string;
	room: TRoom;
}

export interface DesksState {
	desks: TDesk[];
}

export interface TCreateDesks {
	range: number[];
	roomId: number;
}

const initialState: DesksState = {
	desks: [],
};

const desksSlice = createSlice({
	name: 'desks',
	initialState,
	reducers: {
		setDesks: (state, action) => {
			state.desks = action.payload.desks;
		},
	},
});

export const desksApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getAllDesks: builder.query<TDesk[], PaginationOptions & { roomId: number }>({
			query: params => `/desk/${params.roomId}/${params.page}/${params.size}`,
			providesTags: ['Desks'],
		}),
		createAllDesks: builder.mutation<TDesk[], TCreateDesks>({
			query: params => ({
				url: `/desk/all`,
				method: 'POST',
				body: params,
			}),
			invalidatesTags: ['Desks'],
		}),
	}),
});

export const { useCreateAllDesksMutation, useLazyGetAllDesksQuery, useGetAllDesksQuery } = desksApi;
export const { setDesks } = desksSlice.actions;
export const initialTasksState = initialState;
export default desksSlice.reducer;
