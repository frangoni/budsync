import useModal from '@/modules/_shared/hooks/useModal';
import usePagination from '@/modules/_shared/hooks/usePagination';
import { useGetRoomsQuery } from '@/redux/reducers/rooms';

export default function useRooms() {
	const { openModal, closeModal, modalRef } = useModal();
	const { page, size } = usePagination();
	const { data: rooms } = useGetRoomsQuery({ page, size });

	return {
		openModal,
		closeModal,
		modalRef,
		rooms,
	};
}
