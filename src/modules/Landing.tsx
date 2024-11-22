import { useNavigate } from 'react-router-dom';
import { ROUTES } from './_shared/_routes';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/store';

export default function Landing() {
	const navigate = useNavigate();
	const { token } = useAppSelector(({ users }) => users);

	useEffect(() => {
		const redirectUrl = token ? ROUTES.dashboard : ROUTES.login;
		navigate(redirectUrl);
	}, [token]);

	return null;
}
