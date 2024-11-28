import { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/store';
import Loader from '@/modules/_shared/components/Loading';
import 'react-medium-image-zoom/dist/styles.css';
import Zoom from 'react-medium-image-zoom';

interface PlantImageProps {
	id?: number;
}

const FETCH_URL = 'http://localhost:8080/file/';

export default function PlantImage({ id }: PlantImageProps) {
	const fetchUrl = `${FETCH_URL}${id}`;
	const { token } = useAppSelector(({ users }) => users);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	useEffect(() => {
		fetch(fetchUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'image/png',
				Authorization: 'Bearer ' + token,
			},
		})
			.then(response => response.blob())
			.then(blob => {
				const url = URL.createObjectURL(blob);
				setImageUrl(url);
			})
			.catch(() => {
				setImageUrl(null);
			});
	}, [fetchUrl, token]);

	if (!imageUrl) return <Loader />;

	return (
		<Zoom classDialog='zoom-dialog'>
			<img src={imageUrl} loading='lazy' alt={`File ${id}`} />
		</Zoom>
	);
}
