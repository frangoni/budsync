import { StyledTable } from './styles';
import { TableProps } from 'antd';

export default function AppTable<T extends object>({ columns, dataSource, ...rest }: TableProps<T>) {
	//@ts-expect-error - This is a custom component
	return (
		<StyledTable
			scroll={{ x: 'max-content' }}
			bordered={false}
			columns={columns}
			dataSource={dataSource}
			{...rest}
		/>
	);
}
