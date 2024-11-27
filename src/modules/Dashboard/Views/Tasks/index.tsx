import Header from '@/modules/_shared/components/Layout/Header';
import AppTable from '@/modules/_shared/components/Table';
import { TTask } from '@/redux/reducers/tasks';
import useTasks from './useTasks';
import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';
import TableToolbar from '@/modules/_shared/components/Table/Toolbar';
import { AppRadioGroup } from '@/modules/_shared/components/Form/styles';

export default function Tasks() {
	const { COLUMNS, data, setTaskType, tasksType, options } = useTasks();
	return (
		<>
			<Header title='Tasks' description='See and manage tasks' />
			<SectionContainer>
				<AppTable<TTask>
					columns={COLUMNS}
					dataSource={data?.content}
					title={() => (
						<TableToolbar
							title='Tasks'
							items={[
								<AppRadioGroup
									options={options}
									onChange={setTaskType}
									value={tasksType}
									optionType='button'
								/>,
							]}
						/>
					)}
					rowKey='id'
				/>
			</SectionContainer>
		</>
	);
}
