import { useState } from 'react';
import imageCompression from 'browser-image-compression';

export default function Uploader() {
	const [compressedImage, setCompressedImage] = useState<string | null>(null);

	const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const imageFile = event.currentTarget?.files[0];
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
		<div>
			<input type='file' capture='environment' accept='image/*' onChange={handleImageUpload} />
			{compressedImage && <img src={compressedImage} alt='Compressed Preview' />}
		</div>
	);
}
