import { FormHeader, FormWrapper } from '../styles';
import Leaf from '@/modules/_shared/assets/pngs/leaf-fill.png';
import type { FormProps } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useLoginMutation } from '@/redux/reducers/users';
import { Link, useNavigate } from 'react-router-dom';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { ROUTES } from '@/modules/_shared/_routes';
import { AppForm, AppInput, PasswordInput } from '@/modules/_shared/components/Form/styles';
import AppButton from '@/modules/_shared/components/Button';
import { Card } from '@/modules/_shared/components/Layout/_styles';
import AuthContainer from '..';

type FieldType = {
	username: string;
	password: string;
};

export default function Login() {
	const [login, { isLoading }] = useLoginMutation();
	const notification = useNotification();
	const navigate = useNavigate();

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		const logUser = await login(values);
		if (logUser.error) {
			return notification.error({
				message: 'Error on login',
				description: `Invalid credentials`,
			});
		}
		notification.success({
			message: 'User login!',
			description: 'Welcome',
		});
		navigate(ROUTES.dashboard);
	};
	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
		const error = errorInfo.errorFields[0].errors[0];
		notification.error({
			message: 'Error on submit',
			description: `${error}`,
		});
	};

	return (
		<AuthContainer>
			<FormWrapper>
				<Card>
					<FormHeader>
						<img className='logo' src={Leaf} alt='Marihuana Leaf' />
						<h2>Login</h2>
						<p>Login with credentials</p>
					</FormHeader>
					{/* @ts-expect-error Form extend */}
					<AppForm
						layout='vertical'
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete='off'
					>
						<AppForm.Item<FieldType>
							label='Email'
							name='username'
							rules={[{ required: true, message: 'Please input your User name!' }]}
						>
							<AppInput prefix={<UserOutlined />} placeholder='Username' />
						</AppForm.Item>

						<AppForm.Item<FieldType>
							label='Password'
							name='password'
							rules={[{ required: true, message: 'Please input your password!' }]}
						>
							<PasswordInput prefix={<LockOutlined />} type='password' placeholder='Password' />
						</AppForm.Item>

						<p>
							Forgot your password? <Link to={ROUTES.forgot}>Recover</Link>
						</p>
						<div className='spacer-24' />
						<AppForm.Item>
							<AppButton block text='Submit' htmlType='submit' loading={isLoading} />
						</AppForm.Item>
					</AppForm>
				</Card>
			</FormWrapper>
		</AuthContainer>
	);
}
