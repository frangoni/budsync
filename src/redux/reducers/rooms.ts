import { createSlice } from '@reduxjs/toolkit';
import { baseApi, PaginationResponse } from '../baseApi';
import { PaginationOptions } from './pagination';

export interface TRoom {
	id: string;
	name: string;
}

interface TRoomWQuantity {
	activePlants: number;
	room: TRoom;
}

export interface RoomsState {
	rooms: TRoom[];
	currentRoom?: TRoom;
}
const initialState: RoomsState = {
	rooms: [],
	currentRoom: undefined,
};

const roomsSlice = createSlice({
	name: 'rooms',
	initialState,
	reducers: {
		setRooms: (state, action) => {
			state.rooms = action.payload.rooms;
		},
		setRoom: (state, action) => {
			state.currentRoom = action.payload.room;
		},
	},
});

export const roomsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getRooms: builder.query<PaginationResponse<TRoomWQuantity>, PaginationOptions>({
			query: params => ({
				url: `/room/activePlants/${params.page}/${params.size}`,
				method: 'GET',
				cache: 'no-cache',
			}),
		}),
		createRoom: builder.mutation({
			query: room => ({
				url: `/room`,
				method: 'POST',
				body: room,
			}),
			invalidatesTags: ['Rooms'],
		}),
		editRoom: builder.mutation({
			query: room => ({
				url: `/room/${room.id}`,
				method: 'PUT',
				body: room,
			}),
			invalidatesTags: ['Rooms'],
		}),
		deleteRoom: builder.mutation({
			query: id => ({
				url: `/room/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Rooms'],
		}),
		getRoom: builder.query<TRoom, string>({
			query: id => `/room/${id}`,
			providesTags: ['Rooms'],
		}),
	}),
});

export const { useGetRoomsQuery, useGetRoomQuery, useCreateRoomMutation, useEditRoomMutation, useDeleteRoomMutation } =
	roomsApi;
export const { setRooms } = roomsSlice.actions;
export const initialRoomsState = initialState;
export default roomsSlice.reducer;
