import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';
import Header from '@/modules/_shared/components/Layout/Header';
import AppTable from '@/modules/_shared/components/Table';
import useUsers from './useUsers';
import { TUser } from '@/redux/reducers/users';
import Loader from '@/modules/_shared/components/Loading';
import Modal from '@/modules/_shared/components/Dialog';
import Toolbar from '@/modules/_shared/components/Layout/Toolbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import AddUser from './AddUser';
import EditUser from './EditUser';

export default function Users() {
	const { data, isLoading, COLUMNS, modalRef, handleAddUser, modalContent, closeModal, selectedUser } = useUsers();

	if (isLoading) return <Loader />;
	return (
		<>
			<Header title='Users' description='Invite and edit users' />
			<Toolbar
				items={[
					{
						icon: <Icon icon='mdi:user-add-outline' />,
						onClick: handleAddUser,
						text: 'Add user',
					},
				]}
			/>
			<SectionContainer>
				<AppTable<TUser>
					columns={COLUMNS}
					dataSource={data}
					title={() => 'Users'}
					rowKey={'id'}
					loading={isLoading}
				/>
			</SectionContainer>

			<Modal ref={modalRef}>
				{modalContent === 'add' && <AddUser onSubmit={closeModal} />}
				{modalContent === 'edit' && <EditUser onSubmit={closeModal} selectedUser={selectedUser} />}
			</Modal>
		</>
	);
}
