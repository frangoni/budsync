import AppButton from '@/modules/_shared/components/Button';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { useCreateRoomMutation } from '@/redux/reducers/rooms';
import { Form, FormProps, Input } from 'antd';

type FieldType = {
	roomName?: string;
};

interface AddRoomProps {
	onSubmit: () => void;
}

export default function AddRoom({ onSubmit }: AddRoomProps) {
	const notification = useNotification();
	const [createRoom] = useCreateRoomMutation();

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		const createdRoom = await createRoom(values);
		console.log('createdRoom :', createdRoom);
		notification.success({
			message: 'Room created!',
			description: 'Successfull created room: ' + values.roomName,
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
		<Form layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
			<Form.Item<FieldType>
				label='Room name'
				name='roomName'
				rules={[{ required: true, message: 'Please choose a room name!' }]}
			>
				<input placeholder='Room name' />
			</Form.Item>
			<Form.Item>
				<AppButton text='Create room' block type='primary' htmlType='submit' />
			</Form.Item>
		</Form>
	);
}
