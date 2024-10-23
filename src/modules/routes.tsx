import { createBrowserRouter, redirect } from 'react-router-dom';
import Landing from './Landing';
import { ROUTES } from './_shared/_routes';
import { CONSTANTS } from './_shared/_constants';
import localforage from 'localforage';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

const getToken = async () => localforage.getItem(CONSTANTS.JWT_LS_KEY);

const router = createBrowserRouter([
	{
		path: ROUTES.home,
		element: <Landing />,
	},
	{
		path: ROUTES.login,
		async loader() {
			const token = await getToken();
			return token ? redirect(ROUTES.dashboard) : null;
		},
		element: <Login />,
	},
	{
		path: ROUTES.register,
		async loader() {
			const token = await getToken();
			return token ? redirect(ROUTES.dashboard) : null;
		},
		element: <Register />,
	},
	{
		path: ROUTES.dashboard,
		async loader() {
			const token = await getToken();
			return token ? null : redirect(ROUTES.login);
		},
		element: <Dashboard />,
		children: [
			{
				path: ROUTES.rooms,
				element: <div>Rooms</div>,
			},
			{
				path: ROUTES.plants,
				element: <div>Plants</div>,
			},
			{
				path: ROUTES.reports,
				element: <div>Reports</div>,
			},
			{
				path: ROUTES.users,
				element: <div>Users</div>,
			},
		],
	},
	{
		path: '*',
		element: <div>404</div>,
	},
]);

export default router;
