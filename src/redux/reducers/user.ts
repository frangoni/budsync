import { CONSTANTS as K } from '@/modules/_shared/_constants';
import { baseApi } from '../baseApi';
import { createSlice } from '@reduxjs/toolkit';
import localforage from 'localforage';

export interface UserState {
	user: User | null;
	token: string | null;
}
export interface User {
	name: string;
	email: string;
	role: string;
}

const initialState: UserState = {
	token: null,
	user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		logout: state => {
			state.user = null;
			state.token = null;
			localforage.removeItem(K.JWT_LS_KEY);
		},
		getCurrentUser: state => {
			return state.user;
		},
	},
});

export const userApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getUser: builder.query({
			query: () => `/me`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					/* const { data } = await queryFulfilled; */
					const data = { user: { name: 'test', email: 'test@gmail.com' }, token: 'test' };
					dispatch(setUser({ user: data.user, token: data.token }));
					localforage.setItem(K.JWT_LS_KEY, data.token);
				} catch (e) {
					console.error(`Error fetching user:${e}`);
				}
			},
		}),
		login: builder.mutation({
			query: credentials => ({
				url: `/user/login`,
				method: 'POST',
				body: credentials,
			}),
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUser({ user: data.user, token: data.token }));
					localforage.setItem(K.JWT_LS_KEY, data.token);
				} catch (e) {
					console.error(`Login failed: ${e}`);
				}
			},
		}),
		register: builder.mutation({
			query: credentials => ({
				url: `/user/register`,
				method: 'POST',
				body: credentials,
			}),
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUser({ user: data.user, token: data.token }));
					localforage.setItem(K.JWT_LS_KEY, data.token);
				} catch (e) {
					console.error(`RTegister failed: ${e}`);
				}
			},
		}),
	}),
	overrideExisting: false,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery, useLoginMutation, useRegisterMutation } = userApi;
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
