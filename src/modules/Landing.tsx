import { useNavigate } from 'react-router-dom';
import { ROUTES } from './_shared/_routes';
import { useGetUserQuery } from '@/redux/reducers/users';
import { useEffect } from 'react';

export default function Landing() {
	const { data } = useGetUserQuery(null);
	const navigate = useNavigate();

	useEffect(() => {
		const redirectUrl = data?.user ? ROUTES.dashboard : ROUTES.login;
		navigate(redirectUrl);
	}, [data, navigate]);

	return null;
}
