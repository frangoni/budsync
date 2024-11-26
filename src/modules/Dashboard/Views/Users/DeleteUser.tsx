import AppButton from '@/modules/_shared/components/Button';
import { ButtonGroup, ConfirmationWrapper } from '@/modules/_shared/components/Layout/_styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { TUser, useDeleteUserMutation } from '@/redux/reducers/users';
import { Icon } from '@iconify/react/dist/iconify.js';

interface DeleteUserProps {
	onSubmit: () => void;
	selectedUser: TUser | null;
}

export default function DeleteUser({ onSubmit, selectedUser }: DeleteUserProps) {
	const [deleteUser, { isLoading, isError }] = useDeleteUserMutation();
	const notification = useNotification();
	const handleDeleteUser = async () => {
		if (!selectedUser) return;
		await deleteUser(selectedUser.id);

		if (isError) {
			return notification.error({
				message: 'Error on user delete',
			});
		}
		notification.success({
			message: 'User deleted!',
			description: `Successfully deleted user ${selectedUser?.username}`,
		});
		onSubmit();
	};

	return (
		<ConfirmationWrapper>
			<Icon icon='mdi:warning-decagram-outline' fontSize={'56rem'} />
			<h4>Do you want to delete user {selectedUser?.username}?</h4>
			<ButtonGroup>
				<AppButton text='Yes' onClick={handleDeleteUser} buttonType='secondary' loading={isLoading} />
				<AppButton text='No' onClick={onSubmit} buttonType='danger' loading={isLoading} />
			</ButtonGroup>
		</ConfirmationWrapper>
	);
}
