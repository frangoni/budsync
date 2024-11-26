import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppInput } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { TPlant, useEditPlantMutation } from '@/redux/reducers/plants';
import { FormProps } from 'antd';

type FieldType = {
	totalQ?: number;
};

interface HarvestPlantProps {
	onSubmit: () => void;
	plant: TPlant | undefined;
}

export default function HarvestPlant({ onSubmit, plant }: HarvestPlantProps) {
	const notification = useNotification();
	const [harvestPlant] = useEditPlantMutation();

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		const harvestedPlant = await harvestPlant({
			totalQ: values.totalQ,
			active: false,
			id: plant?.id,
			strainId: plant?.strain.id,
			roomId: plant?.room.id,
		});
		console.log('harvestedPlant :', harvestedPlant);
		notification.success({
			message: 'Plant harvested!',
			description: 'Total quantity: ' + values.totalQ,
		});
		onSubmit();
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
		const error = errorInfo.errorFields[0].errors[0];
		notification.error({
			message: 'Error on plant harvest',
			description: `${error}`,
		});
	};

	return (
		// @ts-expect-error Antd Form component
		<AppForm layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
			<h2>Harvest your plant</h2>
			<div className='spacer-24' />
			<AppForm.Item<FieldType>
				label='Total quantity (grams)'
				name='totalQ'
				rules={[{ required: true, message: 'Please select the total quantity!' }]}
			>
				<AppInput placeholder='Total quantity (grams)' type='number' min={1} />
			</AppForm.Item>
			<AppForm.Item>
				<AppButton text='Harvest plant' block type='primary' htmlType='submit' />
			</AppForm.Item>
		</AppForm>
	);
}
