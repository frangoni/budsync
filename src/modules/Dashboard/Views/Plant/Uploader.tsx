import imageCompression from 'browser-image-compression';
import { AppInput } from '@/modules/_shared/components/Form/styles';
import { UploaderWrapper } from './_styles';

interface UploaderProps {
	compressedImage: string | null;
	setCompressedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Uploader({ compressedImage, setCompressedImage }: UploaderProps) {
	const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.currentTarget?.files) return;
		const imageFile = event.currentTarget.files[0];
		console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
		console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

		const options = {
			maxSizeMB: 0.5,
			maxWidthOrHeight: 800,
			useWebWorker: true,
		};

		try {
			// Compress the image
			const compressedFile = await imageCompression(imageFile, options);
			console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
			console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

			// Convert to a URL to preview or upload
			const compressedImageUrl = URL.createObjectURL(compressedFile);
			console.log('compressedImageUrl :', compressedImageUrl);
			setCompressedImage(compressedImageUrl);

			// You can now upload the compressedFile to your server or API
		} catch (error) {
			console.error('Error during image compression:', error);
		}
	};

	return (
		<UploaderWrapper>
			<AppInput type='file' capture='environment' accept='image/*' onChange={handleImageUpload} />
			{compressedImage && <img src={compressedImage} alt='Compressed Preview' />}
		</UploaderWrapper>
	);
}
