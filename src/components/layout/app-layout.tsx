import { Outlet } from 'react-router-dom';

import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';

import { AppSidebar } from './sidebar';

export function AppLayout() {
	return (
		<SidebarProvider className='bg-background'>
			<AppSidebar />

			<SidebarInset className='min-h-screen bg-background p-0 md:p-3'>
				<div className='flex min-h-[calc(100vh-24px)] flex-col overflow-hidden rounded-none md:rounded-xl md:border bg-card shadow-xs'>
					<header className='flex h-14 shrink-0 items-center gap-3 border-b px-5'>
						<SidebarTrigger />

						<div className='h-5 w-px bg-border' />

						<span className='text-sm font-medium'>
							Система управления гражданами
						</span>
					</header>

					<main className='flex-1 bg-muted/30 p-6'>
						<Outlet />
					</main>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
