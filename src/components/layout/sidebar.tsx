import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShieldCheck } from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

const navigation = [
	{
		title: 'Дашборд',
		url: '/dashboard',
		icon: LayoutDashboard,
	},
	{
		title: 'Реестр граждан',
		url: '/citizens',
		icon: Users,
	},
];

export function AppSidebar() {
	const { pathname } = useLocation();

	return (
		<Sidebar collapsible='offcanvas' className='border-none bg-background'>
			<SidebarHeader>
				<div className='flex items-center gap-2 px-2 py-2'>
					<div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
						<ShieldCheck size={20} />
					</div>

					<div className='grid gap-0.5 flex-1 text-left text-sm leading-tight'>
						<span className='truncate text-[20px] font-semibold'>граждане</span>
						<span className='truncate text-[10px] uppercase font-semibold text-muted-foreground'>
							единая система учёта
						</span>
					</div>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className='px-3'>
						Рабочее пространство
					</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							{navigation.map(item => {
								const isActive = pathname === item.url;

								return (
									<SidebarMenuItem key={item.url}>
										<SidebarMenuButton
											render={<NavLink to={item.url} />}
											isActive={isActive}
											tooltip={item.title}
											className=' px-3 py-3 text-sm'
										>
											<item.icon />
											<span>{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
