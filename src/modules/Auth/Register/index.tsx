import { BgImage, FormHeader, FormWrapper, ImageWrapper, LoginContainer } from '../styles';
import LoginBG from '@/modules/_shared/assets/webp/login-bg.webp';
import Leaf from '@/modules/_shared/assets/pngs/leaf-fill.png';
import MainContainer from '@/modules/_shared/components/Layout/MainContainer';
import type { FormProps } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRegisterMutation } from '@/redux/reducers/users';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { Card } from '@/modules/_shared/components/Layout/_styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppInput, PasswordInput } from '@/modules/_shared/components/Form/styles';
import { ROUTES } from '@/modules/_shared/_routes';

type FieldType = {
	name: string;
	lastName: string;
	password: string;
};

export default function Register() {
	const [register, { isLoading }] = useRegisterMutation();
	const notification = useNotification();
	const navigate = useNavigate();
	const { uuid } = useParams();

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		if (!uuid) {
			return notification.error({
				message: 'Error on registration',
				description: `Missing token`,
			});
		}
		const createUser = await register({ ...values, token: uuid });
		if (createUser.error) {
			return notification.error({
				message: 'Error on registration',
				description: `Invalid credentials`,
			});
		}

		notification.success({
			message: 'User registered!',
			description: 'Welcome',
		});
		navigate(ROUTES.dashboard);
	};
	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
		const error = errorInfo.errorFields[0].errors[0];
		notification.error({
			message: 'Error on registration',
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
							<h2>Welcome!</h2>
							<p>Create your user credentials</p>
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
								label='First name'
								name='name'
								rules={[{ required: true, message: 'Please input your first name!' }]}
							>
								<AppInput prefix={<UserOutlined />} placeholder='First Name' />
							</AppForm.Item>
							<AppForm.Item<FieldType>
								label='Last name'
								name='lastName'
								rules={[{ required: true, message: 'Please input your last name!' }]}
							>
								<AppInput prefix={<UserOutlined />} placeholder='Last Name' />
							</AppForm.Item>

							<AppForm.Item<FieldType>
								label='Password'
								name='password'
								rules={[{ required: true, message: 'Please input your password!' }]}
							>
								<PasswordInput prefix={<LockOutlined />} type='password' placeholder='Password' />
							</AppForm.Item>

							<p>
								Already have an account? <Link to={ROUTES.login}>Login</Link>
							</p>
							<div className='spacer-24' />

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
