import { createBrowserRouter, redirect } from 'react-router-dom';
import { lazy } from 'react';
import { ROUTES } from './_shared/_routes';
import { CONSTANTS } from './_shared/_constants';
import localforage from 'localforage';
import Recover from './Auth/Recover';
import ErrorElement from './_shared/components/Error';
const Settings = lazy(() => import('./Dashboard/Views/Settings'));
const Landing = lazy(() => import('./Landing'));
const Login = lazy(() => import('./Auth/Login'));
const Forgot = lazy(() => import('./Auth/Forgot'));
const Register = lazy(() => import('./Auth/Register'));
const Dashboard = lazy(() => import('./Dashboard'));
const Rooms = lazy(() => import('./Dashboard/Views/Rooms'));
const Plants = lazy(() => import('./Dashboard/Views/Plants'));
const Room = lazy(() => import('./Dashboard/Views/Room'));
const Plant = lazy(() => import('./Dashboard/Views/Plant'));
const Tasks = lazy(() => import('./Dashboard/Views/Tasks'));
const Task = lazy(() => import('./Dashboard/Views/Task'));
const Record = lazy(() => import('./Dashboard/Views/Record'));
const Stats = lazy(() => import('./Dashboard/Views/Stats'));
const Users = lazy(() => import('./Dashboard/Views/Users'));
const NotFound = lazy(() => import('./404'));

const getToken = async () => localforage.getItem(CONSTANTS.JWT_LS_KEY);

const router = createBrowserRouter([
	{
		path: ROUTES.home,
		element: <Landing />,
		errorElement: <ErrorElement />,
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
		path: ROUTES.forgot,
		async loader() {
			const token = await getToken();
			return token ? redirect(ROUTES.dashboard) : null;
		},
		element: <Forgot />,
	},
	{
		path: ROUTES.recover,
		async loader() {
			const token = await getToken();
			return token ? redirect(ROUTES.dashboard) : null;
		},
		element: <Recover />,
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
				element: <Rooms />,
			},
			{
				path: ROUTES.room,
				element: <Room />,
			},
			{
				path: ROUTES.plants,
				element: <Plants />,
			},
			{
				path: ROUTES.plant,
				element: <Plant />,
			},
			{
				path: ROUTES.tasks,
				element: <Tasks />,
			},
			{
				path: ROUTES.task,
				element: <Task />,
			},
			{
				path: ROUTES.record,
				element: <Record />,
			},
			{
				path: ROUTES.reports,
				element: <Stats />,
			},
			{
				path: ROUTES.users,
				element: <Users />,
			},
			{
				path: ROUTES.settings,
				element: <Settings />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

export default router;
