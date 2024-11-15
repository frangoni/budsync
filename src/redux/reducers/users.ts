import { CONSTANTS as K } from '@/modules/_shared/_constants';
import { baseApi } from '../baseApi';
import { createSlice } from '@reduxjs/toolkit';
import localforage from 'localforage';

export type Role = 'Admin' | 'User';
export interface TUser {
	name: string;
	email: string;
	role: Role;
	id: string;
	active: boolean;
}

export interface UsersState {
	currentUser: TUser | null;
	token: string | null;
	users: TUser[];
}

const initialState: UsersState = {
	token: null,
	currentUser: null,
	users: [],
};

const usersSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.currentUser = action.payload.user;
			state.token = action.payload.token;
		},
		setUsers: (state, action) => {
			state.users = action.payload.users;
		},
		logout: state => {
			state.currentUser = null;
			state.token = null;
			localforage.removeItem(K.JWT_LS_KEY);
		},
	},
});

export const usersApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getUser: builder.query({
			query: () => `/me`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					/* const { data } = await queryFulfilled; */
					const data = { user: { id: '1', name: 'test', email: 'test@gmail.com' }, token: 'test' };
					dispatch(setUser(data.user));
					localforage.setItem(K.JWT_LS_KEY, data.token);
				} catch (e) {
					console.error(`Error fetching user:${e}`);
				}
			},
		}),
		getAllUsers: builder.query<TUser[], void>({
			query: () => `/users`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUsers({ users: data }));
				} catch (e) {
					console.error(`Error fetching users:${e}`);
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
					console.error(`Register failed: ${e}`);
				}
			},
		}),

		addUser: builder.mutation<void, { email: string }>({
			query: credentials => ({
				url: `/user/invite`,
				method: 'POST',
				body: credentials,
			}),
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					return data;
				} catch (e) {
					console.error(`Error on user add: ${e}`);
				}
			},
		}),
		editUser: builder.mutation<void, { role: Role; active: boolean }>({
			query: credentials => ({
				url: `/user`,
				method: 'PUT',
				body: credentials,
			}),
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					return data;
				} catch (e) {
					console.error(`Error on user edit: ${e}`);
				}
			},
		}),
	}),
	overrideExisting: false,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetUserQuery,
	useLoginMutation,
	useRegisterMutation,
	useEditUserMutation,
	useGetAllUsersQuery,
	useAddUserMutation,
} = usersApi;
export const { setUser, setUsers, logout } = usersSlice.actions;
export default usersSlice.reducer;
