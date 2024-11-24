import { StyledTable } from './styles';
import { TableProps } from 'antd';

export default function AppTable<T extends object>({ columns, dataSource, ...rest }: TableProps<T>) {
	return (
		<StyledTable
			scroll={{ x: 'max-content' }}
			bordered={false}
			//@ts-expect-error Custom Table component
			columns={columns}
			dataSource={dataSource}
			{...rest}
		/>
	);
}
