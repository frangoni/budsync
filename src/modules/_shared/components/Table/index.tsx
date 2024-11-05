import { StyledTable } from './styles';
import { TableProps } from 'antd';

interface AppTableProps<T = unknown> extends TableProps<T> {}

export default function AppTable<T extends object>({ columns, dataSource, ...rest }: AppTableProps<T>) {
	return <StyledTable bordered={false} columns={columns} dataSource={dataSource} {...rest} />;
}
