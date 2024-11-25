import { PaginationOptions, setPage, setPagination, setSize } from '@/redux/reducers/pagination';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';

export default function usePagination() {
	const { page, size } = useAppSelector(state => state.pagination);
	const dispatch = useAppDispatch();

	const handlePageChange = (pageNumber: number) => dispatch(setPage(pageNumber));
	const handlePageSizeChange = (pageSize: number) => dispatch(setSize(pageSize));
	const resetPage = () => dispatch(setPage(0));
	const handlePaginationChange = (opts: PaginationOptions) => {
		const { page, size } = opts;
		dispatch(setPagination({ page, size }));
	};

	useEffect(() => {
		resetPage();
	}, []);

	return {
		page,
		size,
		handlePageChange,
		handlePageSizeChange,
		handlePaginationChange,
		resetPage,
	};
}
