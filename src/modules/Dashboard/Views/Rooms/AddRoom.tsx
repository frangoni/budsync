import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppInput } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { useCreateAllDesksMutation } from '@/redux/reducers/desks';
import { useCreateRoomMutation } from '@/redux/reducers/rooms';
import { FormProps } from 'antd';

type FieldType = {
	name: string;
	numberOfRooms: number;
};

interface AddRoomProps {
	onSubmit: () => void;
}

export default function AddRoom({ onSubmit }: AddRoomProps) {
	const notification = useNotification();
	const [createRoom, { isLoading }] = useCreateRoomMutation();
	const [createDesks, { isLoading: isLoadingDesks }] = useCreateAllDesksMutation();

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		const { numberOfRooms, name } = values;
		const createdRoom = await createRoom({ name });
		const range = numberOfRooms === 1 ? [1] : [1, numberOfRooms];
		const createdDesks = await createDesks({
			range,
			roomId: createdRoom.data?.id,
		});
		console.log('createdDesks :', createdDesks);
		if (!createdRoom.data) return;
		notification.success({
			message: 'Room created!',
			description: 'Successfull room creation: ' + createdRoom.data.name,
		});
		onSubmit();
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
		const error = errorInfo.errorFields[0].errors[0];
		notification.error({
			message: 'Error on room creation',
			description: `${error}`,
		});
	};

	return (
		// @ts-expect-error Antd Form component
		<AppForm layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
			<h2>Create a room</h2>
			<div className='spacer-24' />
			<AppForm.Item<FieldType>
				label='Room name'
				name='name'
				rules={[{ required: true, message: 'Please choose a room name!' }]}
			>
				<AppInput placeholder='Room name' />
			</AppForm.Item>
			<AppForm.Item<FieldType>
				label='Number of rooms'
				name='numberOfRooms'
				rules={[{ required: true, message: 'Please choose a number of rooms!' }]}
			>
				<AppInput type='number' placeholder='Number of rooms' min={1} step={1} />
			</AppForm.Item>
			<AppForm.Item>
				<AppButton
					text='Create room'
					block
					type='primary'
					htmlType='submit'
					loading={isLoading || isLoadingDesks}
				/>
			</AppForm.Item>
		</AppForm>
	);
}
