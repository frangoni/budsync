import usePagination from '../../hooks/usePagination';
import { StyledTable } from './_styles';
import { TableProps } from 'antd';

interface AppTableProps<T> extends TableProps<T> {
	totalCount?: number;
}

export default function AppTable<T extends object>({ columns, dataSource, totalCount, ...rest }: AppTableProps<T>) {
	const { page, size, handlePaginationChange } = usePagination();

	return (
		<StyledTable
			scroll={{ x: 'max-content' }}
			bordered={false}
			//@ts-expect-error Custom Table component
			columns={columns}
			dataSource={dataSource}
			pagination={{
				responsive: true,
				current: page + 1,
				pageSize: size,
				showSizeChanger: true,
				total: totalCount,
				onChange(page, pageSize) {
					handlePaginationChange({ page: page - 1, size: pageSize });
				},
			}}
			{...rest}
		/>
	);
}
