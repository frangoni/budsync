import Header from '@/modules/_shared/components/Layout/Header';
import { useGetRoomQuery } from '@/redux/reducers/rooms';
import { useParams } from 'react-router-dom';

export default function Room() {
	const { roomId } = useParams();
	const { data, isLoading, error } = useGetRoomQuery(roomId!, { skip: !roomId });

	if (isLoading) return <div>Loading...</div>;
	return (
		<div>
			<Header title='Room' description={'Manage room name, add plants or search for active'} shouldGoBack />
		</div>
	);
}
