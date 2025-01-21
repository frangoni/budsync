import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppSelect } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { useGetAllDesksQuery } from '@/redux/reducers/desks';
import { TCreatePlants, TEditPlant, TPlant, useEditPlantMutation } from '@/redux/reducers/plants';
import { useGetStrainsQuery } from '@/redux/reducers/strains';
import { FormProps } from 'antd';
import { useEffect } from 'react';

interface EditPlantProps {
	onSubmit: () => void;
	plant: TPlant | undefined;
}

export default function EditPlant({ onSubmit, plant }: EditPlantProps) {
	const notification = useNotification();
	const [form] = AppForm.useForm<TEditPlant>();
	const [editPlant, { isLoading }] = useEditPlantMutation();
	const { data: allDesks, isLoading: loadingDesks } = useGetAllDesksQuery({
		roomId: Number(plant?.desk.room.id) || 0,
		page: 0,
		size: -1,
	});
	const { data: strains, isLoading: loadingStrains } = useGetStrainsQuery();

	useEffect(() => {
		if (plant) {
			form.setFieldsValue({
				deskId: plant.desk.id,
				strainId: plant.strain.id,
			});
		}
	}, [plant, form]);

	const onFinish: FormProps<TEditPlant>['onFinish'] = async (values: TEditPlant) => {
		const editedPlant = await editPlant({ ...plant, ...values });
		if (editedPlant.error) {
			return notification.error({
				message: 'Error on plant edit',
				description: `Please try again later!`,
			});
		}

		notification.success({
			message: 'Plant edited!',
			description: 'Successfull edited plant',
		});

		form.resetFields();
		onSubmit();
	};

	const onFinishFailed: FormProps<TCreatePlants>['onFinishFailed'] = errorInfo => {
		const error = errorInfo.errorFields[0].errors[0];
		notification.error({
			message: 'Error on plant edit',
			description: `${error}`,
		});
	};

	return (
		// @ts-expect-error Antd Form component
		<AppForm form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
			<h2>Edit plants details</h2>
			<div className='spacer-24' />

			<AppForm.Item label='Table ' name='deskId' rules={[{ required: true, message: 'Please select a table!' }]}>
				<AppSelect
					loading={loadingDesks}
					placeholder='Select an existing table'
					options={allDesks?.map(desk => ({ value: desk.id, label: desk.name }))}
					showSearch
				/>
			</AppForm.Item>

			<AppForm.Item
				label='Strain'
				name='strainId'
				rules={[{ required: true, message: 'Please select or create a strain!' }]}
			>
				<AppSelect
					loading={loadingStrains}
					placeholder='Select an existing strain'
					options={strains?.map(strain => ({ value: strain.id, label: strain.name }))}
					showSearch
				/>
			</AppForm.Item>

			<div className='spacer-16' />
			<AppForm.Item>
				<AppButton text='Edit plant' block type='primary' htmlType='submit' loading={isLoading} />
			</AppForm.Item>
		</AppForm>
	);
}
