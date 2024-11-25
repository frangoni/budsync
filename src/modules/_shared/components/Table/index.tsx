import usePagination from '../../hooks/usePagination';
import { StyledTable } from './styles';
import { TableProps } from 'antd';

export default function AppTable<T extends object>({ columns, dataSource, ...rest }: TableProps<T>) {
	const { page, size, handlePaginationChange } = usePagination();

	return (
		<StyledTable
			scroll={{ x: 'max-content' }}
			bordered={false}
			//@ts-expect-error Custom Table component
			columns={columns}
			dataSource={dataSource}
			pagination={{
				current: page + 1,
				pageSize: size,
				showSizeChanger: true,
				onChange(page, pageSize) {
					handlePaginationChange({ page, size: pageSize });
				},
			}}
			{...rest}
		/>
	);
}
