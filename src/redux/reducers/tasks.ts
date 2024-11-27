import { createSlice } from '@reduxjs/toolkit';
import { baseApi, PaginationResponse } from '../baseApi';
import { PaginationOptions } from './pagination';
import { TUser } from './users';

export interface TTask {
	id: string;
	recordId: string;
	createdBy: TUser;
	assignedTo: TUser;
	description: string;
	deleted: boolean;
	resolvedAt: string;
}

export type TTaskType = 'assignedUser' | 'createdByUser';

export interface TasksState {
	tasks: TTask[];
}

export interface TCreateTask {
	recordId: string;
	createdBy: string;
	assignedTo: string;
	description: string;
}

const initialState: TasksState = {
	tasks: [],
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks: (state, action) => {
			state.tasks = action.payload.tasks;
		},
	},
});

export const tasksApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getAllTasks: builder.query<PaginationResponse<TTask>, PaginationOptions & { type: TTaskType; id: number }>({
			query: params => `/task/${params.type}/${params.id}/${params.page}/${params.size}`,
			providesTags: ['Tasks'],
		}),
		finishTask: builder.mutation({
			query: (id: string) => ({
				url: `/task/done/${id}`,
				method: 'PUT',
			}),
			invalidatesTags: ['Tasks'],
		}),
		getTasksByRecord: builder.query<PaginationResponse<TTask>, PaginationOptions & { recordId: string }>({
			query: params => `/task/record/${params.recordId}/${params.page}/${params.size}`,
			providesTags: ['Tasks'],
		}),
		createTask: builder.mutation({
			query: (task: { assignTo: number; description: string; recordId: number }) => ({
				url: '/task',
				method: 'POST',
				body: task,
			}),
			invalidatesTags: ['Tasks'],
		}),
	}),
});

export const { useGetAllTasksQuery, useCreateTaskMutation, useFinishTaskMutation, useGetTasksByRecordQuery } = tasksApi;
export const { setTasks } = tasksSlice.actions;
export const initialTasksState = initialState;
export default tasksSlice.reducer;
