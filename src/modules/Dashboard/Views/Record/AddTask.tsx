import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppInput, AppSelect } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { useCreateTaskMutation } from '@/redux/reducers/tasks';
import { useGetAllUsersQuery } from '@/redux/reducers/users';
import { useAppSelector } from '@/redux/store';
import { FormProps } from 'antd';

type FieldType = {
	assignedTo: string;
	description: string;
};

interface AddTaskProps {
	onSubmit: () => void;
	recordId?: string;
}

export default function AddTask({ onSubmit, recordId }: AddTaskProps) {
	const notification = useNotification();
	const [createTask] = useCreateTaskMutation();
	const { data: users, isLoading: loadingUsers } = useGetAllUsersQuery();
	const userId = useAppSelector(({ users }) => users.currentUser?.id);
	console.log('userId :', userId);

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		if (!userId || !recordId) return;
		const newTask = await createTask({ ...values, recordId, createdBy: userId });
		console.log('newTask :', newTask);

		notification.success({
			message: 'Task created!',
			description: 'Task successfully created',
		});
		onSubmit();
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
		const error = errorInfo.errorFields[0].errors[0];
		notification.error({
			message: 'Error on task creation',
			description: `${error}`,
		});
	};

	return (
		// @ts-expect-error Antd Form component
		<AppForm layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
			<h2>Add a record</h2>
			<div className='spacer-24' />
			<AppForm.Item<FieldType>
				label='Task description'
				name='description'
				rules={[{ required: true, message: 'Please write a description for the task!' }]}
			>
				<AppInput placeholder='Description' type='text' />
			</AppForm.Item>
			<AppForm.Item<FieldType>
				label='Assign to'
				name='assignedTo'
				rules={[{ required: true, message: 'Please assign the task to an user!' }]}
			>
				<AppSelect
					loading={loadingUsers}
					placeholder='Add task to an user'
					options={users?.map(user => ({ value: user.id, label: user.name }))}
					showSearch
				/>
			</AppForm.Item>

			<AppForm.Item>
				<AppButton text='Create task' block type='primary' htmlType='submit' />
			</AppForm.Item>
		</AppForm>
	);
}
