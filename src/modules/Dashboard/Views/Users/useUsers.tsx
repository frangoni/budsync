import { TUser, useGetAllUsersQuery } from '@/redux/reducers/users';
import USERS_COLUMNS from './_columns';
import useModal from '@/modules/_shared/hooks/useModal';
import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import AppButton from '@/modules/_shared/components/Button';
import usePagination from '@/modules/_shared/hooks/usePagination';
import { ActionsCell } from '@/modules/_shared/components/Table/styles';

type ModalContent = 'add' | 'edit' | 'delete';

export default function useUsers() {
	const { page, size } = usePagination();
	const { data, isLoading, isError, refetch } = useGetAllUsersQuery({ page, size }, { refetchOnFocus: true });
	const [modalContent, setModalContent] = useState<ModalContent>('add');
	const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
	const { closeModal, modalRef, openModal } = useModal();

	const handleAddUser = () => {
		setModalContent('add');
		openModal();
	};

	const handleEditUser = (user: TUser) => {
		setSelectedUser(user);
		setModalContent('edit');
		openModal();
	};

	const handleDeleteUser = (user: TUser) => {
		setSelectedUser(user);
		setModalContent('delete');
		openModal();
	};

	const COLUMNS = [
		...USERS_COLUMNS,
		{
			title: 'Action',
			key: 'action',
			render: (_: string, user: TUser) => (
				<ActionsCell>
					<AppButton icon={<Icon icon='mdi:pencil' />} onClick={() => handleEditUser(user)} />
					<AppButton
						icon={<Icon icon='mdi:delete' />}
						onClick={() => handleDeleteUser(user)}
						buttonType='danger'
					/>
				</ActionsCell>
			),
			width: 1,
		},
	];

	return {
		data,
		isLoading,
		isError,
		COLUMNS,
		closeModal,
		modalRef,
		openModal,
		selectedUser,
		handleAddUser,
		modalContent,
		page,
		size,
		refetch,
	};
}
