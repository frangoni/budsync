import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppInput } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { FormProps } from 'antd';
import { ParametersWrapper } from './styles';
import { useEditParametersMutation, useGetParametersQuery } from '@/redux/reducers/parameters';
import { useForm } from 'antd/es/form/Form';

interface FieldType {
	minHumidity: number;
	maxHumidity: number;
	minNutrient: number;
	medium: string;
	id: number;
}

export default function Parameters() {
	const notification = useNotification();
	const [editParameters] = useEditParametersMutation();
	const { data: parametersData, isLoading } = useGetParametersQuery(undefined, { refetchOnMountOrArgChange: true });
	const appParams = parametersData?.[parametersData.length - 1];

	const [form] = useForm<FieldType>();

	if (appParams) form.setFieldsValue(appParams);

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		console.log('values :', values);
		const editedParameters = await editParameters({ ...values, id: appParams?.id || 1 });
		console.log('editedParameters :', editedParameters);

		if (editedParameters.error) {
			return notification.error({
				message: 'Error',
				description: `We couldn't update your parameters. Try again later!`,
			});
		}
		notification.success({
			message: 'Parameters edited!',
			description: 'Successfully updated parameters',
		});
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
		const error = errorInfo.errorFields[0].errors[0];
		notification.error({
			message: 'Error on parameters edit',
			description: `${error}`,
		});
	};

	return (
		<ParametersWrapper>
			<h4>Parameters</h4>
			<p>Manage app parameters</p>
			<div className='spacer-24' />
			{/* @ts-expect-error Antd Form component */}
			<AppForm form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
				{/* add hidden id field */}
				<AppForm.Item
					label='Minimum Humidity'
					name='minHumidity'
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<AppInput type='number' min={0} />
				</AppForm.Item>
				<AppForm.Item
					label='Maximum Humidity'
					name='maxHumidity'
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<AppInput type='number' min={0} />
				</AppForm.Item>
				<AppForm.Item
					label='Minimum Nutrient'
					name='minNutrient'
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<AppInput type='number' min={0} />
				</AppForm.Item>
				<AppForm.Item
					label='Medium'
					name='medium'
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<AppInput />
				</AppForm.Item>
				<AppForm.Item>
					<AppButton
						text='Update parameters user'
						block
						type='primary'
						htmlType='submit'
						loading={isLoading}
					/>
				</AppForm.Item>
			</AppForm>
		</ParametersWrapper>
	);
}
