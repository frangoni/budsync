import { Suspense, useEffect } from 'react';
import { Outlet, useOutlet } from 'react-router-dom';
import Sidebar from '../_shared/components/Sidebar';
import MainContainer from '../_shared/components/Layout/MainContainer';
import { ContentWrapper, DashboardWrapper } from './_styles';
import Welcome from './Views/Welcome';
import Loader from '../_shared/components/Loading';
import { useRefreshTokenMutation } from '@/redux/reducers/users';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorElement from '../_shared/components/Error';
import NetworkStrength from '../_shared/components/NetworkStrength';

export default function Dashboard() {
	const hasOutlet = useOutlet();
	const [refreshToken] = useRefreshTokenMutation();

	useEffect(() => {
		refreshToken();
	}, []);

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
