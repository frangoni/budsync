import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://budsync.io/api/' : 'localhost:5432/api';

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: () => ({}),
});
