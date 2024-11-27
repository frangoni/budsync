import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppInput, AppSelect } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { useAddUserMutation, useGetRolesQuery } from '@/redux/reducers/users';
import { FormProps } from 'antd';

interface FieldType {
	username: string;
	userRole: number;
}

interface AddUserProps {
	onSubmit: () => void;
}

export default function AddUser({ onSubmit }: AddUserProps) {
	const notification = useNotification();
	const [addUser, { isLoading }] = useAddUserMutation();
	const { data: roles, isLoading: loadingRoles } = useGetRolesQuery();

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		if (!values.username) return;
		const newUser = await addUser(values);
		if (newUser.error) {
			return notification.error({
				message: 'Error on user invite',
			});
		}
		notification.success({
			message: 'User invited!',
			description: 'Successfully invited: ' + values.username,
		});
		onSubmit();
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
		const error = errorInfo.errorFields[0].errors[0];
		notification.error({
			message: 'Error on user invite',
			description: `${error}`,
		});
	};

	return (
		// @ts-expect-error Antd Form component
		<AppForm layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
			<h2>Invite a new user</h2>
			<div className='spacer-24' />
			<AppForm.Item<FieldType>
				label='Email'
				name='username'
				rules={[{ required: true, message: 'Please type an email!' }]}
			>
				<AppInput type='email' placeholder='Invite email' />
			</AppForm.Item>
			<AppForm.Item label='Role' name='userRole' rules={[{ required: true, message: 'Please select a role!' }]}>
				<AppSelect
					loading={loadingRoles}
					placeholder='Select a role'
					options={roles?.map(role => ({ value: role.id, label: role.name }))}
					showSearch
				/>
			</AppForm.Item>

			<AppForm.Item>
				<AppButton text='Add user' block type='primary' htmlType='submit' loading={isLoading} />
			</AppForm.Item>
		</AppForm>
	);
}
