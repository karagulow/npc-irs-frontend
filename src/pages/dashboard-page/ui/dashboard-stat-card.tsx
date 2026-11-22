import React from 'react';
import type { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardStatCardProps {
	title: string;
	value: number;
	description: string;
	icon: LucideIcon;
}

export const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
	title,
	value,
	description,
	icon: Icon,
}) => {
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>{title}</CardTitle>

				<Icon className='text-muted-foreground size-4' />
			</CardHeader>

			<CardContent>
				<div className='text-2xl font-bold'>
					{value.toLocaleString('ru-RU')}
				</div>

				<p className='text-muted-foreground text-xs'>{description}</p>
			</CardContent>
		</Card>
	);
};
