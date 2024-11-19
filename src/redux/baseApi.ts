import { CONSTANTS } from '@/modules/_shared/_constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import localforage from 'localforage';

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://budsync.io/api/' : 'http://localhost:5432/api';
const getToken = () => localforage.getItem(CONSTANTS.JWT_LS_KEY) || '';

export const baseApi = createApi({
	reducerPath: 'api',
	tagTypes: ['Rooms', 'Users', 'Plants', 'Tasks', 'Records', 'Strains', 'Reports', 'Parameters'],
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
