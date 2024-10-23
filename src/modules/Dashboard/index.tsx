import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../_shared/components/Sidebar';
import MainContainer from '../_shared/components/Layout/MainContainer';
import { ContentWrapper, DashboardWrapper } from './styles';

export default function Dashboard() {
	return (
		<MainContainer>
			<DashboardWrapper>
				<Sidebar />
				<ContentWrapper>
					<Suspense>
						<Outlet />
					</Suspense>
				</ContentWrapper>
			</DashboardWrapper>
		</MainContainer>
	);
}
