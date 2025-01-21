import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate, useOutlet } from 'react-router-dom';
import Sidebar from '../_shared/components/Sidebar';
import MainContainer from '../_shared/components/Layout/MainContainer';
import { ContentWrapper, DashboardWrapper } from './_styles';
import Welcome from './Views/Welcome';
import Loader from '../_shared/components/Loading';
import { logout, useRefreshTokenMutation } from '@/redux/reducers/users';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorElement from '../_shared/components/Error';
import NetworkStrength from '../_shared/components/NetworkStrength';
import { useAppDispatch } from '@/redux/store';
import { ROUTES } from '../_shared/_routes';

export default function Dashboard() {
	const hasOutlet = useOutlet();
	const [refreshToken, { isError }] = useRefreshTokenMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		refreshToken();
		if (isError) {
			dispatch(logout());
			navigate(ROUTES.login);
		}
	}, [refreshToken, isError]);

	return (
		<MainContainer>
			<DashboardWrapper>
				<Sidebar />
				<ContentWrapper>
					<NetworkStrength />
					<ErrorBoundary FallbackComponent={ErrorElement}>
						<Suspense fallback={<Loader />}>{hasOutlet ? <Outlet /> : <Welcome />}</Suspense>
					</ErrorBoundary>
				</ContentWrapper>
			</DashboardWrapper>
		</MainContainer>
	);
}
