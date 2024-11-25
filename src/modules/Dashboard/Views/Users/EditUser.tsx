import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppSelect, AppSwitch } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { Role, TUser, useEditUserMutation } from '@/redux/reducers/users';
import { FormProps } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';

interface FieldType {
	deleted: boolean;
	role: string;
}

interface EditUserProps {
	onSubmit: () => void;
	selectedUser: TUser | null;
}

export default function EditUser({ onSubmit, selectedUser }: EditUserProps) {
	const notification = useNotification();
	const [editUser, { isLoading }] = useEditUserMutation();
	const [form] = useForm<FieldType>();

	useEffect(() => {
		if (selectedUser) {
			form.setFieldsValue({
				role: selectedUser.userRole.name,
				deleted: selectedUser.deleted,
			});
		}
	}, [selectedUser, form]);

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		const editedUser = await editUser(values);
		notification.success({
			message: 'User edited!',
			description: 'Successfully edited user',
		});
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
				label='Role'
				name='role'
				rules={[{ required: true, message: 'Please select a role!' }]}
			>
				<AppSelect value={form.getFieldValue('role')}>
					<AppSelect.Option value='Admin'>Admin</AppSelect.Option>
					<AppSelect.Option value='User'>User</AppSelect.Option>
				</AppSelect>
			</AppForm.Item>
			<AppForm.Item<FieldType>
				label='Archived?'
				name='deleted'
				rules={[{ required: true, message: 'Please set status!' }]}
				valuePropName='checked'
			>
				<AppSwitch checked={form.getFieldValue('deleted')} />
			</AppForm.Item>
			<AppForm.Item>
				<AppButton text='Edit user' block type='primary' htmlType='submit' loading={isLoading} />
			</AppForm.Item>
		</AppForm>
	);
}
