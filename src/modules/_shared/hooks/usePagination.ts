import { useCallback, useReducer } from 'react';
import { useSettings } from '../../../redux/hooks';
import K from '../constants';
import { Sort } from '../graphql/generated';
import { emitClearAllSelectedRowsEvent } from '../services';
import { PaginationState } from './@types';
import { useColumnAndDirection } from './useReload';
import { paginationStateReducer } from './utils';

interface PaginationOptions {
	orderBy?: string;
	sort?: Sort;
}

const initialState: PaginationState = {
	pageNumber: 1,
	sort: Sort.Desc,
	orderBy: 'createdAt',
};

export default function usePagination({ orderBy, sort }: PaginationOptions = {}) {
	const [state, dispatch] = useReducer(paginationStateReducer, initialState, (obj) => ({
		...obj,
		orderBy: orderBy ?? obj.orderBy,
		sort: sort ?? obj.sort,
	}));

	const { resultsPerPage } = useSettings();

	function updateColumnAndDirection(direction: Sort, columnName: string) {
		dispatch({
			type: 'CHANGE_SORTED_COLUMN_AND_DIRECTION',
			payload: { sort: direction, orderBy: columnName },
		});
	}

	const handleSort = useCallback(
		(columnName: string, dir?: Sort): Sort => {
			const direction =
				dir ??
				(columnName === state.orderBy
					? state.sort === Sort.Asc
						? Sort.Desc
						: Sort.Asc
					: Sort.Asc);
			updateColumnAndDirection(direction, columnName);
			return direction;
		},
		[state.sort, state.orderBy]
	);

	useColumnAndDirection((data: any) => updateColumnAndDirection(data.direction, data.columnName));

	const handlePageChange = useCallback((pageNumber: number) => {
		emitClearAllSelectedRowsEvent();
		return dispatch({ type: 'CHANGE_PAGE_NUMBER', payload: { pageNumber } });
	}, []);

	return {
		handlePageChange,
		handleSort,
		pageNumber: state.pageNumber,
		sort: state.sort,
		orderBy: state.orderBy,
		pageSize: resultsPerPage,
	};
}
