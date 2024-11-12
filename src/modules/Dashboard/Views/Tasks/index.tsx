import Header from '@/modules/_shared/components/Layout/Header';
import AppTable from '@/modules/_shared/components/Table';
import { TTask } from '@/redux/reducers/tasks';
import { TASKS_DATA } from '../Record/_dummy';
import useTasks from './useTasks';
import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';

export default function Tasks() {
	const { COLUMNS } = useTasks();
	return (
		<>
			<Header title='Tasks' description='See and manage tasks' />
			<SectionContainer>
				<AppTable<TTask> columns={COLUMNS} title={() => 'Tasks'} dataSource={TASKS_DATA} rowKey='id' />
			</SectionContainer>
		</>
	);
}
