import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppInput } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { useAddUserMutation } from '@/redux/reducers/users';
import { FormProps } from 'antd';

interface FieldType {
	email: string;
}

interface AddUserProps {
	onSubmit: () => void;
}

export default function AddUser({ onSubmit }: AddUserProps) {
	const notification = useNotification();
	const [addUser] = useAddUserMutation();

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		if (!values.email) return;
		const newUser = await addUser(values);
		console.log('newUser :', newUser);
		notification.success({
			message: 'User invited!',
			description: 'Successfully invited: ' + values.email,
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
			<div className='spacer-12' />
			<AppForm.Item<FieldType>
				label='Email'
				name='email'
				rules={[{ required: true, message: 'Please type an email!' }]}
			>
				<AppInput type='email' placeholder='Invite email' />
			</AppForm.Item>
			<AppForm.Item>
				<AppButton text='Add user' block type='primary' htmlType='submit' />
			</AppForm.Item>
		</AppForm>
	);
}
