import { FormHeader, FormWrapper } from '../styles';
import Leaf from '@/modules/_shared/assets/pngs/leaf-fill.png';
import { type FormProps } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useRecoverPasswordMutation } from '@/redux/reducers/users';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { ROUTES } from '@/modules/_shared/_routes';
import { AppForm, PasswordInput } from '@/modules/_shared/components/Form/styles';
import AppButton from '@/modules/_shared/components/Button';
import { Card } from '@/modules/_shared/components/Layout/_styles';
import AuthContainer from '..';

type FieldType = {
	password: string;
	confirmPassword: string;
};

export default function Recover() {
	const [recoverPass, { isLoading }] = useRecoverPasswordMutation();
	const notification = useNotification();
	const { uuid } = useParams<{ uuid: string }>();
	const navigate = useNavigate();

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		if (values.password !== values.confirmPassword) {
			return notification.error({
				message: 'Error on recover password',
				description: `Passwords do not match`,
			});
		}
		if (!uuid) {
			return notification.error({
				message: 'Error on recover password',
				description: `Invalid token`,
			});
		}
		const forgottenPassword = await recoverPass({ ...values, token: uuid });
		if (forgottenPassword.error) {
			return notification.error({
				message: 'Error on recover password',
				description: `Invalid credentials`,
			});
		}
		notification.success({
			message: 'Password recovered',
			description: 'Successfully recovered password. Login now!',
		});
		navigate(ROUTES.login);
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
						<h2>Create a new password</h2>
						<p>Submit a new password to reset</p>
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
							label='New password'
							name='password'
							rules={[{ required: true, message: 'Password too short!', min: 7 }]}
						>
							<PasswordInput prefix={<LockOutlined />} placeholder='Password' />
						</AppForm.Item>
						<AppForm.Item<FieldType>
							label='Confirm Password'
							name='confirmPassword'
							dependencies={['password']}
							rules={[
								{
									required: true,
									message: 'Please confirm your password!',
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error('The new password that you entered do not match!')
										);
									},
								}),
							]}
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
		</AuthContainer>
	);
}
