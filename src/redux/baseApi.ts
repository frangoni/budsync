import { CONSTANTS } from '@/modules/_shared/_constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import localforage from 'localforage';

const baseUrl = import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL : 'http://localhost:8080';

const getToken = () => localforage.getItem(CONSTANTS.JWT_LS_KEY) || '';

export const baseApi = createApi({
	reducerPath: 'api',
	tagTypes: [
		'Rooms',
		'Users',
		'Plants',
		'Tasks',
		'Records',
		'Strains',
		'Reports',
		'Parameters',
		'Desks',
		'Irrigations',
		'Stats',
	],
	baseQuery: fetchBaseQuery({
		baseUrl,
		async prepareHeaders(headers) {
			const token = await getToken();
			if (token) headers.set('authorization', `Bearer ${token}`);
			return headers;
		},
	}),
	endpoints: () => ({}),
});

export type PaginationResponse<T> = {
	content: T[];
	totalElements: number;
	totalPages: number;
	size: number;
	number: number;
	last: boolean;
	numberOfElements: number;
	first: boolean;
	empty: boolean;
};
