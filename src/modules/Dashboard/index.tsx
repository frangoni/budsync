import { Suspense } from 'react';
import { Outlet, useOutlet } from 'react-router-dom';
import Sidebar from '../_shared/components/Sidebar';
import MainContainer from '../_shared/components/Layout/MainContainer';
import { ContentWrapper, DashboardWrapper } from './styles';
import Welcome from './Views/Welcome';

export default function Dashboard() {
	const hasOutlet = useOutlet();

	return (
		<MainContainer>
			<DashboardWrapper>
				<Sidebar />
				<ContentWrapper>
					<Suspense>{hasOutlet ? <Outlet /> : <Welcome />}</Suspense>
				</ContentWrapper>
			</DashboardWrapper>
		</MainContainer>
	);
}
