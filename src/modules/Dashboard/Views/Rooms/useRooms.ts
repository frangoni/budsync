import useModal from '@/modules/_shared/hooks/useModal';
import usePagination from '@/modules/_shared/hooks/usePagination';
import { useGetRoomsQuery } from '@/redux/reducers/rooms';

export default function useRooms() {
	const { openModal, closeModal, modalRef } = useModal();
	const { page, size } = usePagination();
	const { data: rooms, isLoading, refetch } = useGetRoomsQuery({ page, size }, { refetchOnFocus: true });
	const addRoomSuccess = () => {
		refetch();
		closeModal();
	};

	return {
		openModal,
		addRoomSuccess,
		modalRef,
		rooms,
		isLoading,
	};
}
