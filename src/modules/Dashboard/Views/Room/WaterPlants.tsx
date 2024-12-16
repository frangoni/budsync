import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppInput } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { TIrrigation, useCreateIrrigationMutation } from '@/redux/reducers/irrigation';
import { FormProps } from 'antd';
import { PlantIdsPill, PlantIdsPillContainer } from './_styles';

type FieldType = TIrrigation;

interface WaterPlantsProps {
	onSubmit: () => void;
	plantIds: number[];
}

export default function WaterPlants({ onSubmit, plantIds }: WaterPlantsProps) {
	const notification = useNotification();
	const [form] = AppForm.useForm<FieldType>();
	const [waterPlants, { isLoading }] = useCreateIrrigationMutation();

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		const newIrrigation = await waterPlants({ ...values, plantIds });

		if (newIrrigation.error) {
			return notification.error({
				message: 'Error on water registration',
				description: `${newIrrigation.error}`,
			});
		}
		notification.success({
			message: 'Plants succesfully watered!',
		});

		onSubmit();
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
		const error = errorInfo.errorFields[0].errors[0];
		notification.error({
			message: 'Error on water registration',
			description: `${error}`,
		});
	};

	return (
		// @ts-expect-error Antd Form component
		<AppForm form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
			<h2>Add a record</h2>
			<div className='spacer-24' />

			<PlantIdsPillContainer>
				{plantIds.map(plantId => (
					<PlantIdsPill key={plantId}>{plantId}</PlantIdsPill>
				))}
			</PlantIdsPillContainer>
			<AppForm.Item<FieldType>
				label='Entry EC'
				name='entryEC'
				rules={[{ required: true, message: 'Please input a Entry EC!' }]}
			>
				<AppInput placeholder='Entry EC' type='number' min={0} step={0.01} />
			</AppForm.Item>
			<AppForm.Item<FieldType>
				label='Entry PH'
				name='entryPH'
				rules={[{ required: true, message: 'Please input a Entry PH!' }]}
			>
				<AppInput placeholder='Entry PH' type='number' min={0} step={0.01} />
			</AppForm.Item>
			<AppForm.Item<FieldType>
				label='Fertilizer'
				name='fertilizer'
				rules={[{ required: true, message: 'Please input a Fertilizer!' }]}
			>
				<AppInput placeholder='Fertilizer' />
			</AppForm.Item>
			<AppForm.Item<FieldType>
				label='Milliliters'
				name='milliliters'
				rules={[{ required: true, message: 'Please input a Milliliters!' }]}
			>
				<AppInput placeholder='Milliliters' type='number' min={0} step={0.01} />
			</AppForm.Item>
			<AppForm.Item<FieldType>
				label='Runoff EC'
				name='runoffEC'
				rules={[{ required: true, message: 'Please input a Runoff EC!' }]}
			>
				<AppInput placeholder='Runoff EC' type='number' min={0} step={0.01} />
			</AppForm.Item>
			<AppForm.Item<FieldType>
				label='Runoff PH'
				name='runoffPH'
				rules={[{ required: true, message: 'Please input a Runoff PH!' }]}
			>
				<AppInput placeholder='Runoff PH' type='number' min={0} step={0.01} />
			</AppForm.Item>
			<AppForm.Item<FieldType>
				label='Shots Q'
				name='shotsQ'
				rules={[{ required: true, message: 'Please input a Shots Q!' }]}
			>
				<AppInput placeholder='Shots Q' type='number' min={0} step={1} />
			</AppForm.Item>

			<AppForm.Item>
				<AppButton text='Add record' block type='primary' htmlType='submit' loading={isLoading} />
			</AppForm.Item>
		</AppForm>
	);
}
