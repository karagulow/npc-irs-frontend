import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AppLayout } from '@/components/layout/app-layout';
import { ThemeProvider } from '@/components/theme-provider';
import {
	CitizenProfilePage,
	CitizensPage,
	CreateCitizenPage,
	DashboardPage,
	NotFoundPage,
} from '@/pages';

function App() {
	return (
		<ThemeProvider attribute='class' defaultTheme='light' enableSystem>
			<BrowserRouter basename='/npc-irs-frontend'>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Navigate to='/dashboard' replace />} />
						<Route path='dashboard' element={<DashboardPage />} />
						<Route path='citizens' element={<CitizensPage />} />
						<Route path='citizens/new' element={<CreateCitizenPage />} />
						<Route path='citizens/:id' element={<CitizenProfilePage />} />
					</Route>
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
