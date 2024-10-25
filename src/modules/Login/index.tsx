import { BgImage, FormHeader, FormWrapper, ImageWrapper, LoginContainer } from './styles';
import LoginBG from '../_shared/assets/webp/login-bg.webp';
import Leaf from '../_shared/assets/png/leaf-fill.png';
import MainContainer from '../_shared/components/Layout/MainContainer';
import type { FormProps } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useLoginMutation } from '@/redux/reducers/user';
import useNotification from '../_shared/hooks/useNotification';
import { Card } from '../_shared/components/Layout/styles';

type FieldType = {
	username?: string;
	password?: string;
};

export default function Login() {
	const [login] = useLoginMutation();
	const notification = useNotification();

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		const logUser = await login(values);
		notification.success({
			message: 'User login!',
			description: 'Welcome',
		});
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
						<Form
							layout='vertical'
							initialValues={{ remember: true }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete='off'
						>
							<Form.Item<FieldType>
								label='User name'
								name='username'
								rules={[{ required: true, message: 'Please input your User name!' }]}
							>
								<Input prefix={<UserOutlined />} placeholder='Username' />
							</Form.Item>

							<Form.Item<FieldType>
								label='Password'
								name='password'
								rules={[{ required: true, message: 'Please input your password!' }]}
							>
								<Input.Password prefix={<LockOutlined />} type='password' placeholder='Password' />
							</Form.Item>

							<Form.Item>
								<Button block type='primary' htmlType='submit'>
									Submit
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</FormWrapper>
			</LoginContainer>
		</MainContainer>
	);
}
