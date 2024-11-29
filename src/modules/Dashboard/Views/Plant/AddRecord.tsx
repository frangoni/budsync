import AppButton from '@/modules/_shared/components/Button';
import { AppForm, AppInput } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { useAddFileToRecordMutation, useAddRecordMutation } from '@/redux/reducers/records';
import { FormProps } from 'antd';
import Uploader from './Uploader';
import { useState } from 'react';

type FieldType = {
	imageUrl: string;
	humidity: number;
	nutrient: number;
	temperature: number;
};

interface AddRecordProps {
	onSubmit: () => void;
	plantId: string | undefined;
}

export default function AddRecord({ onSubmit, plantId }: AddRecordProps) {
	const notification = useNotification();
	const [form] = AppForm.useForm<FieldType>();
	const [addRecord, { isLoading }] = useAddRecordMutation();
	const [addFileToRecord, { isLoading: isLoadingFile }] = useAddFileToRecordMutation();
	const [compressedImage, setCompressedImage] = useState<string | null>(null);
	const [compressedFile, setCompressedFile] = useState<Blob | null>(null);

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		const timestamp = new Date().toISOString();
		const newRecord = await addRecord({ ...values, plantId, date: timestamp, imageUrl: compressedImage! });
		if (newRecord.error) {
			return notification.error({
				message: 'Error on record registration',
				description: `${newRecord.error}`,
			});
		}
		notification.success({
			message: 'Record added!',
			description: 'Record added successfully',
		});

		if (newRecord.data.id && compressedFile) {
			const response = await addFileToRecord({ recordId: newRecord.data.id, file: compressedFile });
			if (response.error) {
				return notification.error({
					message: 'Error on file upload',
					description: `${response.error}`,
				});
			}
			notification.success({
				message: 'File uploaded!',
				description: 'File uploaded successfully',
			});
		}
		form.resetFields();
		setCompressedFile(null);
		setCompressedImage(null);
		onSubmit();
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
		const error = errorInfo.errorFields[0].errors[0];
		notification.error({
			message: 'Error on record registration',
			description: `${error}`,
		});
	};

	return (
		// @ts-expect-error Antd Form component
		<AppForm form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
			<h2>Add a record</h2>
			<div className='spacer-24' />
			<AppForm.Item<FieldType>
				label='Humidity'
				name='humidity'
				rules={[{ required: true, message: 'Please input a humidity level!' }]}
			>
				<AppInput placeholder='Humidity' type='number' min={0} />
			</AppForm.Item>
			<AppForm.Item<FieldType>
				label='Nutrient'
				name='nutrient'
				rules={[{ required: true, message: 'Please input a nutrient level!' }]}
			>
				<AppInput placeholder='Nutrient' type='number' min={0} />
			</AppForm.Item>
			<AppForm.Item<FieldType>
				label='Temperature'
				name='temperature'
				rules={[{ required: true, message: 'Please input a temperature level!' }]}
			>
				<AppInput placeholder='Temperature' type='number' min={0} />
			</AppForm.Item>
			<AppForm.Item<FieldType>
				label='Image'
				name='imageUrl'
				rules={[{ required: false, message: 'Please add an image!' }]}
			>
				<Uploader
					compressedImage={compressedImage}
					setCompressedImage={setCompressedImage}
					setCompressedFile={setCompressedFile}
				/>
			</AppForm.Item>

			<div className='spacer-24' />
			{isLoadingFile && <p>Uploading file...</p>}
			<AppForm.Item>
				<AppButton text='Add record' block type='primary' htmlType='submit' loading={isLoading} />
			</AppForm.Item>
		</AppForm>
	);
}
