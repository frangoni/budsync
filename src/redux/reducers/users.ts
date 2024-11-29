import { CONSTANTS as K } from '@/modules/_shared/_constants';
import { baseApi, PaginationResponse } from '../baseApi';
import { createSlice } from '@reduxjs/toolkit';
import localforage from 'localforage';
import { PaginationOptions } from './pagination';

export type Role = { id: number; name: 'Admin' | 'Trabajador' };
export interface TRegisterUser {
	token: string;
	name: string;
	lastName: string;
	password: string;
}
export interface TUser {
	name: string;
	lastName: string;
	username: string;
	userRole: Role;
	id: number;
	deleted: boolean;
	verifiedAt: string;
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
		refreshToken: builder.mutation<string, void>({
			query: () => ({
				url: '/refreshToken',
				method: 'POST',
				cache: 'no-cache',
				responseHandler: 'text',
			}),
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setToken(data));
					localforage.setItem(K.JWT_LS_KEY, data);
				} catch (e) {
					console.error(`Error fetching user:${e}`);
				}
			},
		}),
		getAllUsers: builder.query<PaginationResponse<TUser>, PaginationOptions>({
			query: params => `/user/${params.page}/${params.size}`,
			providesTags: ['Users'],
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
					dispatch(setUser(data));
					localforage.setItem(K.JWT_LS_KEY, data.token);
				} catch (e) {
					console.error(`Login failed: ${JSON.stringify(e)}`);
				}
			},
		}),
		register: builder.mutation<TUser & { token: string }, TRegisterUser>({
			query: params => ({
				url: `/user/${params.token}`,
				method: 'POST',
				body: params,
			}),
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUser(data));
					localforage.setItem(K.JWT_LS_KEY, data.token);
				} catch (e) {
					console.error(`Register failed: ${e}`);
				}
			},
		}),
		getRoles: builder.query<Role[], void>({
			query: () => `/userRole`,
		}),
		addUser: builder.mutation<void, { username: string; userRole: number }>({
			query: credentials => ({
				url: `/user/invite`,
				method: 'POST',
				body: credentials,
			}),
		}),
		editUser: builder.mutation<void, Partial<Omit<TUser, 'userRole'>> & { userRole?: number }>({
			query: credentials => ({
				url: `/user`,
				method: 'PUT',
				body: credentials,
			}),
			invalidatesTags: ['Users'],
		}),
		deleteUser: builder.mutation<void, number>({
			query: id => ({
				url: `/user/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Users'],
		}),
		recoverPassword: builder.mutation<void, { token: string; password: string }>({
			query: params => ({
				url: `/user/recover-password/${params.token}`,
				method: 'PUT',
				body: { password: params.password },
			}),
		}),
		forgotPassword: builder.query<void, string>({
			query: email => ({
				url: `/user/forgot-password/${email}`,
				method: 'GET',
				responseHandler: 'text',
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useRefreshTokenMutation,
	useLoginMutation,
	useRegisterMutation,
	useEditUserMutation,
	useGetAllUsersQuery,
	useAddUserMutation,
	useGetRolesQuery,
	useDeleteUserMutation,
	useLazyForgotPasswordQuery,
	useRecoverPasswordMutation,
} = usersApi;
export const { setUser, setUsers, logout, setToken } = usersSlice.actions;
export const initialUserState = initialState;
export default usersSlice.reducer;
