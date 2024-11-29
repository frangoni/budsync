import Loader from '@/modules/_shared/components/Loading';
import 'react-medium-image-zoom/dist/styles.css';
import Zoom from 'react-medium-image-zoom';
import { useGetFileQuery } from '@/redux/reducers/records';

interface PlantImageProps {
	id: number;
}

export default function PlantImage({ id }: PlantImageProps) {
	const { data, isLoading } = useGetFileQuery(id, { refetchOnMountOrArgChange: true });

	if (isLoading || !data) return <Loader />;

	return (
		<Zoom classDialog='zoom-dialog'>
			<img src={data} loading='lazy' alt={`File ${id}`} />
		</Zoom>
	);
}
