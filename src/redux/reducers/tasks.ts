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
		getTask: builder.query<TTask, string>({
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
		finishTask: builder.mutation({
			query: (id: string) => ({
				url: `/tasks/${id}`,
				method: 'PATCH',
				body: { active: false, dateFinished: new Date().toISOString() },
			}),
			invalidatesTags: ['Tasks'],
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setTasks({ tasks: data }));
				} catch (e) {
					console.error(`Error finishing task:${e}`);
				}
			},
		}),
		getMyTasks: builder.query<TTask[], void>({
			query: () => '/tasks',
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

export const { useGetTaskQuery, useCreateTaskMutation, useFinishTaskMutation, useGetMyTasksQuery } = tasksApi;
export const { setTasks } = tasksSlice.actions;
export const initialTasksState = initialState;
export default tasksSlice.reducer;
