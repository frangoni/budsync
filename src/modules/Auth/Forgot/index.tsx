import { FormHeader, FormWrapper } from '../styles';
import Leaf from '@/modules/_shared/assets/pngs/leaf-fill.png';
import type { FormProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useLazyForgotPasswordQuery } from '@/redux/reducers/users';
import { Link } from 'react-router-dom';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { ROUTES } from '@/modules/_shared/_routes';
import { AppForm, AppInput } from '@/modules/_shared/components/Form/styles';
import AppButton from '@/modules/_shared/components/Button';
import { Card } from '@/modules/_shared/components/Layout/_styles';
import AuthContainer from '..';

type FieldType = {
	username: string;
};

export default function Forgot() {
	const [forgotPass, { isFetching }] = useLazyForgotPasswordQuery();
	console.log('isFetching :', isFetching);
	const notification = useNotification();
	const [form] = AppForm.useForm<FieldType>();

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		const forgottenPassword = await forgotPass(values.username);
		if (forgottenPassword.error) {
			return notification.error({
				message: 'Error on recover password',
				description: `Invalid credentials`,
			});
		}
		notification.success({
			message: 'Email sent!',
			description: 'Check your inbox to recover password',
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
		<AuthContainer>
			<FormWrapper>
				<Card>
					<FormHeader>
						<img className='logo' src={Leaf} alt='Marihuana Leaf' />
						<h2>Recover your password</h2>
						<p>Submit username and reset your password</p>
					</FormHeader>
					{/* @ts-expect-error Form extend */}
					<AppForm
						form={form}
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
							<AppInput prefix={<UserOutlined />} type='email' placeholder='Username' />
						</AppForm.Item>

						<p>
							Already have an account? <Link to={ROUTES.login}>Login</Link>
						</p>
						<div className='spacer-24' />
						<AppForm.Item>
							<AppButton block text='Submit' htmlType='submit' loading={isFetching} />
						</AppForm.Item>
					</AppForm>
				</Card>
			</FormWrapper>
		</AuthContainer>
	);
}
