import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

import citizensData from '@/data/citizens.json';

import { Button } from '@/components/ui/button';

import { DashboardStatistics } from './ui/dashboard-statistics';
import { AgeChart } from './ui/age-chart';
import { SocialStatusChart } from './ui/social-status-chart';
import { DistrictChart } from './ui/district-chart';
import { GenderChart } from './ui/gender-chart';

export const DashboardPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className='space-y-6'>
			<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
				<div>
					<h1 className='text-2xl font-semibold tracking-tight'>Главная</h1>
					<p className='text-muted-foreground mt-1'>
						Общая информация о зарегистрированных гражданах
					</p>
				</div>

				<Button onClick={() => navigate('/citizens/new')}>
					<Plus size={17} />
					Добавить гражданина
				</Button>
			</div>

			<DashboardStatistics citizens={citizensData} />

			<div className='grid gap-4 xl:grid-cols-2'>
				<AgeChart citizens={citizensData} />
				<SocialStatusChart citizens={citizensData} />
				<DistrictChart citizens={citizensData} />
				<GenderChart citizens={citizensData} />
			</div>
		</div>
	);
};
