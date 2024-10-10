import { baseApi } from '../baseApi';

export const userApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getUser: builder.query({
			query: () => `/user`,
		}),
		login: builder.query({
			query: () => `/user/login`,
		}),
	}),
	overrideExisting: false,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery, useLoginQuery } = userApi;
