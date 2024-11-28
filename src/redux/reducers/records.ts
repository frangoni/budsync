import { createSlice } from '@reduxjs/toolkit';
import { baseApi, PaginationResponse } from '../baseApi';
import { PaginationOptions } from './pagination';
import { TPlant } from './plants';

export interface TRecord {
	id: number;
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
	plant: TPlant;
	files: TFile[];
}

export interface TFile {
	id: number;
	path: string;
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
		getRecords: builder.query<PaginationResponse<TRecord>, PaginationOptions & { plantId: string }>({
			query: params => `/record/plant/${params.plantId}/${params.page}/${params.size}`,
			providesTags: ['Records'],
		}),
		getRecord: builder.query<TRecord, string>({
			query: id => `/record/${id}`,
			providesTags: ['Records'],
		}),
		addRecord: builder.mutation<TRecord, Partial<TRecord>>({
			query: record => ({
				url: `/record`,
				method: 'POST',
				body: record,
			}),
			invalidatesTags: ['Records'],
		}),
		editRecord: builder.mutation<TRecord, TRecord>({
			query: record => ({
				url: `/record/${record.id}`,
				method: 'PUT',
				body: record,
			}),
			invalidatesTags: ['Records'],
		}),
		deleteRecord: builder.mutation<TRecord, string>({
			query: id => ({
				url: `/record/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Records'],
		}),

		addFileToRecord: builder.mutation<TRecord, { recordId: number; file: Blob }>({
			query: ({ recordId, file }) => {
				const formData = new FormData();
				formData.append('file', file);
				return {
					url: `/file/${recordId}`,
					method: 'POST',
					body: formData,
				};
			},
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
	useAddFileToRecordMutation,
} = recordsApi;
export const { setRecords } = recordsSlice.actions;
export const initialRecordsState = initialState;
export default recordsSlice.reducer;
