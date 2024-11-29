import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppInput, AppSelect } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { useCreateTaskMutation } from '@/redux/reducers/tasks';
import { TUser, useGetAllUsersQuery } from '@/redux/reducers/users';
import { FormProps } from 'antd';

type FieldType = {
	assignTo: number;
	description: string;
	recordId: number;
};

interface AddTaskProps {
	onSubmit: () => void;
	recordId?: number;
}

export default function AddTask({ onSubmit, recordId }: AddTaskProps) {
	const notification = useNotification();
	const [createTask, { isLoading }] = useCreateTaskMutation();
	const { data: users, isLoading: loadingUsers } = useGetAllUsersQuery({ page: 0, size: -1 });

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		if (!recordId) return;
		const newTask = await createTask({ ...values, recordId });
		if (newTask.error) {
			notification.error({
				message: 'Error on task creation',
			});
			return;
		}

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

	const filterActiveUsers = (user: TUser) => {
		return user.deleted === false && user.verifiedAt !== null;
	};

	return (
		// @ts-expect-error Antd Form component
		<AppForm layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
			<h2>Add a task to the record</h2>
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
				name='assignTo'
				rules={[{ required: true, message: 'Please assign the task to an user!' }]}
			>
				<AppSelect
					loading={loadingUsers}
					placeholder='Add task to an user'
					options={users?.content
						.filter(filterActiveUsers)
						.map(user => ({ value: user.id, label: user.name }))}
					showSearch
				/>
			</AppForm.Item>

			<AppForm.Item>
				<AppButton text='Create task' block type='primary' htmlType='submit' loading={isLoading} />
			</AppForm.Item>
		</AppForm>
	);
}
