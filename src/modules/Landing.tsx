import { useNavigate } from 'react-router-dom';
import { ROUTES } from './_shared/_routes';
import { useGetUserQuery } from '@/redux/reducers/user';
import { useEffect } from 'react';

const Landing = () => {
	const { data } = useGetUserQuery(null);
	const navigate = useNavigate();

	useEffect(() => {
		const redirectUrl = data?.user ? ROUTES.dashboard : ROUTES.login;
		navigate(redirectUrl);
	}, [data, navigate]);

	return null;
};

export default Landing;
