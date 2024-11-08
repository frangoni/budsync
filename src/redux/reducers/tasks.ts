import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from '../baseApi';

export interface TTask {
	id: string;
	recordId: string;
	createdBy: string;
	assignedTo: string;
	description: string;
	active: boolean;
	dateFinished: string;
}

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
		getTasks: builder.query<TTask[], void>({
			query: id => `/tasks/${id}`,
			providesTags: ['Tasks'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setTasks({ tasks: data }));
				} catch (e) {
					console.error(`Error fetching tasks:${e}`);
				}
			},
		}),
		createTask: builder.mutation({
			query: (task: TCreateTask) => ({
				url: '/tasks',
				method: 'POST',
				body: task,
			}),
			invalidatesTags: ['Tasks'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setTasks({ tasks: data }));
				} catch (e) {
					console.error(`Error creating task:${e}`);
				}
			},
		}),
	}),
});

export const { useGetTasksQuery, useCreateTaskMutation } = tasksApi;
export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
