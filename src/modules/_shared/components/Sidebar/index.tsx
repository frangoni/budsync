import { Icon } from '@iconify/react';
import NavLogo from '../../assets/png/leaf-fill.png';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../_routes';
import { useState } from 'react';
import {
	CollapseButton,
	SidebarFooter,
	SidebarHeader,
	SidebarLink,
	SidebarLinksWrapper,
	SidebarWrapper,
} from './styles';
import useKeyBindings from '../../hooks/useKeyBindings';
import { logout } from '@/redux/reducers/user';
import { clearStoredState, persistedStore, useAppDispatch } from '@/redux/store';
import { useTheme } from '../../hooks/useTheme';

export default function Sidebar() {
	const { isDark, toggleTheme } = useTheme();
	const [active, setActive] = useState(false);
	const handleClick = () => setActive(!active);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleLogout = async () => {
		await clearStoredState();
		await persistedStore.purge();
		navigate(ROUTES.login);
		dispatch(logout());
	};

	useKeyBindings([{ key: 'b', callback: () => setActive(!active), ctrlKey: true }]);

	return (
		<SidebarWrapper className={`${active ? 'active' : ''}`}>
			<CollapseButton onClick={handleClick}>
				<Icon icon='mdi:arrow-collapse-right' style={{ fontSize: '.8rem' }} />
			</CollapseButton>

			<SidebarHeader>
				<img src={NavLogo} alt='nav logo' />
			</SidebarHeader>
			<SidebarLinksWrapper>
				<SidebarLink to={ROUTES.rooms}>
					<Icon icon='mdi:house-outline' />
					<p>Rooms</p>
				</SidebarLink>
				<SidebarLink to={ROUTES.plants}>
					<Icon icon='mdi:plant-outline' />
					<p>Plants</p>
				</SidebarLink>
				<SidebarLink to={ROUTES.reports}>
					<Icon icon='mdi:report-finance' />
					<p>Reports</p>
				</SidebarLink>
				<SidebarLink to={ROUTES.tasks}>
					<Icon icon='mdi:subtasks' />
					<p>Tasks</p>
				</SidebarLink>
				<SidebarLink to={ROUTES.users}>
					<Icon icon='mdi:user-multiple-outline' />
					<p>Users</p>
				</SidebarLink>
			</SidebarLinksWrapper>

			<SidebarFooter>
				<SidebarLink to={''} onClick={toggleTheme}>
					<Icon
						icon={`${isDark ? 'mdi:moon-and-stars' : 'mdi:white-balance-sunny'}`}
						style={{ fontSize: '1.5rem' }}
					/>
					<p>Theme</p>
				</SidebarLink>
				<SidebarLink to={''} onClick={handleLogout}>
					<Icon icon='mdi:logout' style={{ fontSize: '1.5rem' }} />
					<p>Logout</p>
				</SidebarLink>
			</SidebarFooter>
		</SidebarWrapper>
	);
}
