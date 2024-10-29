import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from '../baseApi';

export interface Room {
	id: string;
	name: string;
	farmId: string;
}

export interface RoomsState {
	rooms: Room[];
	currentRoom?: Room;
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
		getRooms: builder.query<Room[], void>({
			query: () => `/rooms`,
			providesTags: ['Rooms'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setRooms({ rooms: data }));
				} catch (e) {
					console.error(`Error fetching rooms:${e}`);
				}
			},
		}),
		createRoom: builder.mutation({
			query: room => ({
				url: `/rooms`,
				method: 'POST',
				body: room,
			}),
			invalidatesTags: ['Rooms'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setRooms({ rooms: data }));
				} catch (e) {
					console.error(`Error creating room:${e}`);
				}
			},
		}),
		editRoom: builder.mutation({
			query: room => ({
				url: `/rooms/${room.id}`,
				method: 'PUT',
				body: room,
			}),
			invalidatesTags: ['Rooms'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setRooms({ rooms: data }));
				} catch (e) {
					console.error(`Error editing room:${e}`);
				}
			},
		}),
		deleteRoom: builder.mutation({
			query: id => ({
				url: `/rooms/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Rooms'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setRooms({ rooms: data }));
				} catch (e) {
					console.error(`Error deleting room:${e}`);
				}
			},
		}),
		getRoom: builder.query<Room, string>({
			query: id => `/rooms/${id}`,
			providesTags: ['Rooms'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setRooms({ room: [data] }));
				} catch (e) {
					console.error(`Error fetching room:${e}`);
				}
			},
		}),
	}),
});

export const { useGetRoomsQuery, useGetRoomQuery, useCreateRoomMutation, useEditRoomMutation, useDeleteRoomMutation } =
	roomsApi;
export const { setRooms } = roomsSlice.actions;
export default roomsSlice.reducer;
