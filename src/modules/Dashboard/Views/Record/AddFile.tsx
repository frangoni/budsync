import { useState } from 'react';
import Uploader from '../Plant/Uploader';
import { useAddFileToRecordMutation } from '@/redux/reducers/records';
import { AppForm } from '@/modules/_shared/components/Form/styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { FormProps } from 'antd';
import AppButton from '@/modules/_shared/components/Button';

interface FieldType {
	imageUrl: string;
}

interface AddFileProps {
	recordId: number;
	onSubmit: () => void;
}

export default function AddFile({ recordId, onSubmit }: AddFileProps) {
	const notification = useNotification();
	const [form] = AppForm.useForm<FieldType>();
	const [compressedImage, setCompressedImage] = useState<string | null>(null);
	const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
	const [addFileToRecord, { isLoading: isLoadingFile }] = useAddFileToRecordMutation();

	const onFinish: FormProps<FieldType>['onFinish'] = async () => {
		if (!compressedFile)
			return notification.error({
				message: 'Error adding file to record',
				description: 'Please add a file!',
			});
		const response = await addFileToRecord({ recordId, file: compressedFile });
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
		onSubmit();
		form.resetFields();
		setCompressedFile(null);
		setCompressedImage(null);
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
		const error = errorInfo.errorFields[0].errors[0];
		notification.error({
			message: 'Error adding file to record',
			description: `${error}`,
		});
	};

	return (
		// @ts-expect-error Antd Form component
		<AppForm form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
			<h2>Add a file to record</h2>
			<div className='spacer-24' />

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
				<AppButton text='Add file' block type='primary' htmlType='submit' loading={isLoadingFile} />
			</AppForm.Item>
		</AppForm>
	);
}
