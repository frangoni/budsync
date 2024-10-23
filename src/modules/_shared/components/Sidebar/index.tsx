import { Icon } from '@iconify/react';
import NavLogo from '../../assets/png/leaf-fill.png';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../_routes';
import { useState } from 'react';
import { SidebarWrapper } from './styles';
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
			<div className='collapse-sidebar' onClick={handleClick}>
				<Icon icon='mdi:arrow-collapse-right' style={{ fontSize: '.8rem' }} />
			</div>

			<div className='nav-header'>
				<img src={NavLogo} alt='nav logo' />
			</div>
			<div className='nav-links-wrapper'>
				<Link to={ROUTES.rooms} className='nav-link'>
					<Icon icon='mdi:house-outline' />
					<p>Rooms</p>
				</Link>
				<Link to={ROUTES.plants} className='nav-link'>
					<Icon icon='mdi:plant-outline' />
					<p>Plants</p>
				</Link>
				<Link to={ROUTES.reports} className='nav-link'>
					<Icon icon='mdi:report-finance' />
					<p>Reports</p>
				</Link>
				<Link to={ROUTES.users} className='nav-link'>
					<Icon icon='mdi:user-multiple-outline' />
					<p>Users</p>
				</Link>
			</div>

			<div className='nav-footer'>
				<div className='nav-link' onClick={toggleTheme}>
					<Icon
						icon={`${isDark ? 'mdi:moon-and-stars' : 'mdi:white-balance-sunny'}`}
						style={{ fontSize: '1.5rem' }}
					/>
					<p>Theme</p>
				</div>
				<div className='nav-link' onClick={handleLogout}>
					<Icon icon='mdi:logout' style={{ fontSize: '1.5rem' }} />
					<p>Logout</p>
				</div>
			</div>
		</SidebarWrapper>
	);
}
