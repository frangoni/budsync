import { Role, TUser } from '@/redux/reducers/users';
import { UserStatus } from './_styles';

const USERS_COLUMNS = [
	{
		title: '#',
		dataIndex: 'id',
		key: 'id',
		width: 1,
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Last name',
		dataIndex: 'lastName',
		key: 'lastName',
	},
	{
		title: 'Role',
		dataIndex: 'userRole',
		key: 'userRole',
		render: (role: Role) => role.name,
	},
	{
		title: 'Email',
		dataIndex: 'username',
		key: 'username',
	},
	{
		title: 'Status',
		dataIndex: 'deleted',
		key: 'deleted',
		render: (deleted: boolean, record: TUser) => {
			let status;
			status = record.verifiedAt ? 'Active' : 'Pending';
			if (deleted) status = 'Archived';

			return <UserStatus status={status}>{status}</UserStatus>;
		},
	},
];

export default USERS_COLUMNS;
