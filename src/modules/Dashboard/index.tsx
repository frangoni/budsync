import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export default function DashboardPage() {
	return (
		<>
			<Suspense>
				<Outlet />
			</Suspense>
		</>
	);
}
