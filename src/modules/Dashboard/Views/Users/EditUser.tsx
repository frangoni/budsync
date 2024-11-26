import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppInput, AppSelect } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { TUser, useEditUserMutation, useGetRolesQuery } from '@/redux/reducers/users';
import { FormProps } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';

interface FieldType {
	name: string;
	password: string;
	lastName: string;
	userRole: number;
}

interface EditUserProps {
	onSubmit: () => void;
	selectedUser: TUser | null;
}

export default function EditUser({ onSubmit, selectedUser }: EditUserProps) {
	const notification = useNotification();
	const [editUser, { isLoading }] = useEditUserMutation();
	const { data: roles, isLoading: loadingRoles } = useGetRolesQuery();
	console.log('roles :', roles);
	const [form] = useForm<FieldType>();

	useEffect(() => {
		if (selectedUser) {
			form.setFieldsValue({
				userRole: selectedUser.userRole.id,
				name: selectedUser.name,
				lastName: selectedUser.lastName,
			});
		}
	}, [selectedUser, form]);

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		const editedUser = await editUser({ ...selectedUser, ...values });
		if (editedUser.error) {
			notification.error({
				message: 'Error on user edit',
			});
			return;
		}
		notification.success({
			message: 'User edited!',
			description: 'Successfully edited user',
		});
		form.resetFields();
		onSubmit();
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
		const error = errorInfo.errorFields[0].errors[0];
		notification.error({
			message: 'Error on user edit',
			description: `${error}`,
		});
	};

	return (
		// @ts-expect-error Antd Form component
		<AppForm form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
			<h2>Edit an user</h2>
			<div className='spacer-24' />
			<AppForm.Item<FieldType>
				label='Name'
				name='name'
				rules={[{ required: true, message: 'Please type a name!' }]}
			>
				<AppInput placeholder='Name' />
			</AppForm.Item>

			<AppForm.Item<FieldType>
				label='Last name'
				name='lastName'
				rules={[{ required: true, message: 'Please type a last name!' }]}
			>
				<AppInput placeholder='Last name' />
			</AppForm.Item>

			<AppForm.Item<FieldType>
				label='New password'
				name='password'
				rules={[{ required: false, message: 'Please type a password!' }]}
			>
				<AppInput type='password' placeholder='Password' />
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
				<AppButton text='Edit user' block type='primary' htmlType='submit' loading={isLoading} />
			</AppForm.Item>
		</AppForm>
	);
}
