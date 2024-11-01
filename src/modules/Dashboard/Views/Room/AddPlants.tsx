import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppInput } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { TCreatePlants, useCreatePlantsMutation } from '@/redux/reducers/plants';
import { useGetStrainsQuery } from '@/redux/reducers/strains';
import { FormProps, Select } from 'antd';
import { useState } from 'react';
import { generatePDF, generateQRCodes } from './qrGenerator';

interface AddPlantsProps {
	onSubmit: () => void;
	roomId?: string;
}

const DUMMY_CREATED_PLANTS = {
	data: [
		{
			id: '1',
			active: true,
			totalQ: 10,
			roomId: '1',
			strainId: '1',
		},
		{
			id: '2',
			active: true,
			totalQ: 10,
			roomId: '1',
			strainId: '1',
		},
		{
			id: '3',
			active: true,
			totalQ: 10,
			roomId: '1',
			strainId: '1',
		},
	],
};

export default function AddPlants({ onSubmit, roomId }: AddPlantsProps) {
	const notification = useNotification();
	const [createPlants] = useCreatePlantsMutation();
	const { data: strains, isLoading: loadingStrains } = useGetStrainsQuery();
	const [isCreatingStrain, setIsCreatingStrain] = useState(false);

	const onFinish: FormProps<TCreatePlants>['onFinish'] = async values => {
		const createdPlants = DUMMY_CREATED_PLANTS; /* await createPlants(values) */
		notification.success({
			message: 'Plants created!',
			description: 'Successfull created plants: ',
		});

		const qrCode = await generateQRCodes(createdPlants.data);
		console.log(qrCode);
		generatePDF(qrCode);
		onSubmit();
	};

	const onFinishFailed: FormProps<TCreatePlants>['onFinishFailed'] = errorInfo => {
		const error = errorInfo.errorFields[0].errors[0];
		notification.error({
			message: 'Error on room creation',
			description: `${error}`,
		});
	};

	return (
		// @ts-ignore
		<AppForm layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
			<h2>Create new plants</h2>
			<div className='spacer-12' />
			<AppForm.Item<TCreatePlants>
				label='Room name'
				name='roomId'
				rules={[{ required: true, message: 'Please choose a room name!' }]}
				initialValue={roomId}
				style={{ display: 'none' }}
			/>

			<AppForm.Item<TCreatePlants>
				label='How many plants?'
				name='quantity'
				rules={[{ required: true, message: 'Please choose a quantity!' }]}
				initialValue={0}
				style={{ display: 'none' }}
			/>
			<AppInput type='number' name='quantity' />
			<AppForm.Item>
				{/* Strain Selector */}
				<AppForm.Item
					label='Strain'
					name='strainId'
					rules={[{ required: true, message: 'Please select or create a strain!' }]}
				>
					{!isCreatingStrain ? (
						<Select
							loading={loadingStrains}
							placeholder='Select an existing strain'
							disabled={isCreatingStrain}
							options={strains?.map(strain => ({ value: strain.id, label: strain.name }))}
						/>
					) : (
						<AppInput placeholder='Enter new strain name' />
					)}
				</AppForm.Item>

				<AppButton
					text={isCreatingStrain ? 'Choose from existing strains' : 'Create new strain'}
					onClick={() => setIsCreatingStrain(!isCreatingStrain)}
					style={{ marginBottom: '12px' }}
					buttonType='secondary'
				/>

				<AppButton text='Create plants' block type='primary' htmlType='submit' />
			</AppForm.Item>
		</AppForm>
	);
}
