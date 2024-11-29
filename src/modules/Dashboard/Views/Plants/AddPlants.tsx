import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppInput, AppSelect } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { generatePDF } from '@/modules/_shared/utilities/pdf';
import { generateQRCodes } from '@/modules/_shared/utilities/qr';
import { TCreatePlants, useCreatePlantsMutation } from '@/redux/reducers/plants';
import { useGetRoomsQuery } from '@/redux/reducers/rooms';
import { useGetStrainsQuery } from '@/redux/reducers/strains';
import { FormProps } from 'antd';
import { useEffect, useState } from 'react';

interface AddPlantsProps {
	onSubmit: () => void;
	roomId?: string;
}

export default function AddPlants({ onSubmit, roomId }: AddPlantsProps) {
	const notification = useNotification();
	const [isCreatingStrain, setIsCreatingStrain] = useState(false);
	const [form] = AppForm.useForm<TCreatePlants>();
	const { data: strains, isLoading: loadingStrains } = useGetStrainsQuery();
	const { data: rooms, isLoading: loadingRooms } = useGetRoomsQuery(
		{ page: 0, size: -1 },
		{ refetchOnMountOrArgChange: true }
	);
	const [createPlants, { isLoading }] = useCreatePlantsMutation();

	const roomName = rooms?.content.find(({ room }) => room.id == roomId)?.room.name;

	const onFinish: FormProps<TCreatePlants>['onFinish'] = async (values: TCreatePlants) => {
		const createdPlants = await createPlants([values]);
		if (createdPlants.error) {
			return notification.error({
				message: 'Error on plants creation',
				description: `Please try again later!`,
			});
		}

		notification.success({
			message: 'Plants created!',
			description: 'Successfull created plants: ',
		});

		const qrCode = await generateQRCodes(createdPlants.data);
		generatePDF(qrCode);
		form.resetFields();
		onSubmit();
	};

	const onFinishFailed: FormProps<TCreatePlants>['onFinishFailed'] = errorInfo => {
		const error = errorInfo.errorFields[0].errors[0];
		notification.error({
			message: 'Error on room creation',
			description: `${error}`,
		});
	};

	useEffect(() => {
		form.setFieldsValue({ strainName: '' });
	}, [isCreatingStrain]);

	return (
		// @ts-expect-error Antd Form component
		<AppForm form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
			<h2>Create new plants</h2>
			<div className='spacer-24' />
			<AppForm.Item<TCreatePlants>
				label='How many plants?'
				name='amountOfPlants'
				rules={[{ required: true, message: 'Please choose a quantity!' }]}
			>
				<AppInput type='number' name='quantity' min='1' step='1' />
			</AppForm.Item>
			{!roomId ? (
				<AppForm.Item
					label='Room '
					name='roomId'
					rules={[{ required: true, message: 'Please select a room!' }]}
				>
					<AppSelect
						loading={loadingRooms}
						placeholder='Select an existing room'
						disabled={!!roomId}
						options={rooms?.content.map(({ room }) => ({ value: room.id, label: room.name }))}
						showSearch
					/>
				</AppForm.Item>
			) : (
				<AppForm.Item<TCreatePlants>
					label='Room name'
					name='roomId'
					rules={[{ required: true, message: 'Please choose a room name!' }]}
					initialValue={roomId}
				>
					<h4>{roomName}</h4>
				</AppForm.Item>
			)}
			{isCreatingStrain ? (
				<AppForm.Item<TCreatePlants>
					label='New strain'
					name='strainName'
					rules={[{ required: true, message: 'Please input the new Strain name!' }]}
				>
					<AppInput placeholder='New strain' />
				</AppForm.Item>
			) : (
				<AppForm.Item
					label='Strain'
					name='strainName'
					rules={[{ required: true, message: 'Please select or create a strain!' }]}
				>
					<AppSelect
						loading={loadingStrains}
						placeholder='Select an existing strain'
						disabled={isCreatingStrain}
						options={strains?.map(strain => ({ value: strain.name, label: strain.name }))}
						showSearch
					/>
				</AppForm.Item>
			)}
			<AppButton
				text={isCreatingStrain ? 'Choose from existing strains' : 'Create new strain'}
				onClick={() => setIsCreatingStrain(!isCreatingStrain)}
				style={{ width: '100%' }}
				buttonType='secondary'
			/>
			<div className='spacer-16' />
			<AppForm.Item>
				<AppButton text='Create plants' block type='primary' htmlType='submit' loading={isLoading} />
			</AppForm.Item>
		</AppForm>
	);
}
