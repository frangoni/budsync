import { BgImage, FormHeader, FormWrapper, ImageWrapper, LoginContainer } from './styles';
import LoginBG from '../_shared/assets/webp/login-bg.webp';
import Leaf from '../_shared/assets/pngs/leaf-fill.png';
import MainContainer from '../_shared/components/Layout/MainContainer';
import type { FormProps } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useLoginMutation } from '@/redux/reducers/users';
import useNotification from '../_shared/hooks/useNotification';
import { Card } from '../_shared/components/Layout/_styles';
import AppButton from '../_shared/components/Button';
import { AppInput, AppForm, PasswordInput } from '../_shared/components/Form/styles';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../_shared/_routes';

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
		<MainContainer>
			<LoginContainer>
				<ImageWrapper>
					<BgImage src={LoginBG} />
				</ImageWrapper>
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
								label='User name'
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

							<AppForm.Item>
								<AppButton block text='Submit' htmlType='submit' loading={isLoading} />
							</AppForm.Item>
						</AppForm>
					</Card>
				</FormWrapper>
			</LoginContainer>
		</MainContainer>
	);
}
