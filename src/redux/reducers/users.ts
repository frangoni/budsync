import { CONSTANTS as K } from '@/modules/_shared/_constants';
import { baseApi } from '../baseApi';
import { createSlice } from '@reduxjs/toolkit';
import localforage from 'localforage';
import { PaginationOptions } from './pagination';

export type Role = { id: number; name: 'Admin' | 'User' };
export interface TUser {
	name: string;
	lastName: string;
	username: string;
	userRole: Role;
	id: number;
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
		setToken: (state, action) => {
			state.token = action.payload;
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
			query: () => `/refreshToken`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUser(data.user));
					localforage.setItem(K.JWT_LS_KEY, data.token);
				} catch (e) {
					console.error(`Error fetching user:${e}`);
				}
			},
		}),
		getAllUsers: builder.query<TUser[], PaginationOptions>({
			query: params => `/user/${params.page}/${params.size}`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUsers({ users: data }));
				} catch (e) {
					console.error(`Error fetching users:${e}`);
				}
			},
		}),
		login: builder.mutation<TUser & { token: string }, { username: string; password: string }>({
			query: credentials => ({
				url: `/login`,
				method: 'POST',
				body: credentials,
			}),
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log('data :', data);
					dispatch(setUser(data));
					localforage.setItem(K.JWT_LS_KEY, data.token);
				} catch (e) {
					console.error(`Login failed: ${JSON.stringify(e)}`);
				}
			},
		}),
		getRoles: builder.query<Role[], void>({
			query: () => `/userRole`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					return data;
				} catch (e) {
					console.error(`Error fetching roles:${e}`);
				}
			},
		}),
		register: builder.mutation({
			query: credentials => ({
				url: `/user`,
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
		addUser: builder.mutation<void, { username: string; userRole: number }>({
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

export const {
	useGetUserQuery,
	useLoginMutation,
	useRegisterMutation,
	useEditUserMutation,
	useGetAllUsersQuery,
	useAddUserMutation,
	useGetRolesQuery,
} = usersApi;
export const { setUser, setUsers, logout, setToken } = usersSlice.actions;
export const initialUserState = initialState;
export default usersSlice.reducer;
