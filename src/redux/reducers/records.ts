import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from '../baseApi';
import { PaginationOptions } from './pagination';

export interface TRecord {
	id: string;
	plantId: string;
	imageUrl: string;
	timestamp: string;
	humidity: number;
	nutrient: number;
	temperature: number;
	minNutrient: number;
	minHumidity: number;
	maxHumidity: number;
	medium: string;
}

export interface RecordsState {
	records: TRecord[];
}

const initialState: RecordsState = {
	records: [],
};

const recordsSlice = createSlice({
	name: 'records',
	initialState,
	reducers: {
		setRecords: (state, action) => {
			state.records = action.payload.records;
		},
	},
});

export const recordsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getRecords: builder.query<TRecord[], PaginationOptions & { plantId: string }>({
			query: params => `/record/plant/${params.plantId}/${params.page}/${params.size}`,
			providesTags: ['Records'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setRecords({ records: data }));
				} catch (e) {
					console.error(`Error fetching records:${e}`);
				}
			},
		}),
		getRecord: builder.query<TRecord, string>({
			query: id => `/records/${id}`,
			providesTags: ['Records'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setRecords({ records: [data] }));
				} catch (e) {
					console.error(`Error fetching record:${e}`);
				}
			},
		}),
		addRecord: builder.mutation<TRecord, Partial<TRecord>>({
			query: record => ({
				url: `/records`,
				method: 'POST',
				body: record,
			}),
			invalidatesTags: ['Records'],
		}),
		editRecord: builder.mutation<TRecord, TRecord>({
			query: record => ({
				url: `/records/${record.id}`,
				method: 'PUT',
				body: record,
			}),
			invalidatesTags: ['Records'],
		}),
		deleteRecord: builder.mutation<TRecord, string>({
			query: id => ({
				url: `/records/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Records'],
		}),
	}),
});

export const {
	useGetRecordsQuery,
	useGetRecordQuery,
	useAddRecordMutation,
	useEditRecordMutation,
	useDeleteRecordMutation,
} = recordsApi;
export const { setRecords } = recordsSlice.actions;
export default recordsSlice.reducer;
