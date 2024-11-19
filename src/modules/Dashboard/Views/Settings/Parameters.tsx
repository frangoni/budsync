import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppInput } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { FormProps } from 'antd';
import { ParametersWrapper } from './styles';
import { useEditParametersMutation, useGetParametersQuery } from '@/redux/reducers/parameters';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';

interface FieldType {
	curentMinHumidity: number;
	currentMaxHumidity: number;
	currentMinNutrient: number;
	medium: string;
}

export default function Parameters() {
	const notification = useNotification();
	const { data: parameters } = useGetParametersQuery();
	const [editParameters] = useEditParametersMutation();
	const [form] = useForm<FieldType>();

	useEffect(() => {
		if (parameters) {
			form.setFieldsValue({
				curentMinHumidity: parameters.minHumidity,
				currentMaxHumidity: parameters.maxHumidity,
				currentMinNutrient: parameters.minNutrient,
				medium: parameters.medium,
			});
		}
	}, [parameters, form]);

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		const editedParameters = await editParameters(values);
		console.log('editedParameters :', editedParameters);
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
			<AppForm form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
					<AppButton text='Update parameters user' block type='primary' htmlType='submit' />
				</AppForm.Item>
			</AppForm>
		</ParametersWrapper>
	);
}
