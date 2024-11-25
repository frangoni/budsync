import { Role, TUser } from '@/redux/reducers/users';

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
			if (deleted) return 'Archived';
			if (record.verifiedAt) return 'Active';
			return 'Pending';
		},
	},
];

export default USERS_COLUMNS;
