import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PaginationOptions = { page: number; size: number };

const initialState: PaginationOptions = {
	page: 1,
	size: 10,
};

const paginationSlice = createSlice({
	name: 'pagination',
	initialState,
	reducers: {
		setPagination: (state, action: PayloadAction<PaginationOptions>) => {
			state.page = action.payload.page;
			state.size = action.payload.size;
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setSize: (state, action: PayloadAction<number>) => {
			state.size = action.payload;
		},
	},
});

export const { setPagination, setPage, setSize } = paginationSlice.actions;
export const initialPaginationState = initialState;
export default paginationSlice.reducer;
