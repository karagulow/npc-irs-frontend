import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AppLayout } from '@/components/layout/app-layout';
import { CitizenProfilePage, CitizensPage, DashboardPage } from '@/pages';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppLayout />}>
					<Route index element={<Navigate to='/dashboard' replace />} />
					<Route path='dashboard' element={<DashboardPage />} />
					<Route path='citizens' element={<CitizensPage />} />
					{/* <Route path='citizens/new' element={<CreateCitizenPage />} /> */}
					<Route path='citizens/:id' element={<CitizenProfilePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
