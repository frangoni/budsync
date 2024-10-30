import { BgImage, FormHeader, FormWrapper, ImageWrapper, LoginContainer } from '../Login/styles';
import LoginBG from '../_shared/assets/webp/login-bg.webp';
import Leaf from '../_shared/assets/pngs/leaf-fill.png';
import MainContainer from '../_shared/components/Layout/MainContainer';
import type { FormProps } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useRegisterMutation } from '@/redux/reducers/user';
import useNotification from '../_shared/hooks/useNotification';
import { Card } from '../_shared/components/Layout/styles';
import { useParams } from 'react-router-dom';
import AppButton from '../_shared/components/Button';

type FieldType = {
	username?: string;
	password?: string;
};

export default function Register() {
	const [register] = useRegisterMutation();
	const notification = useNotification();
	const { uuid } = useParams();

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		const createUser = await register({ ...values, uuid });
		notification.success({
			message: 'User registered!',
			description: 'Welcome',
		});
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
								<AppButton block text='Submit' htmlType='submit' />
							</Form.Item>
						</Form>
					</Card>
				</FormWrapper>
			</LoginContainer>
		</MainContainer>
	);
}
