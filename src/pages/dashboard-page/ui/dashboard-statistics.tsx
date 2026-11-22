import React from 'react';
import {
	Users,
	UserRound,
	UserRoundCheck,
	BriefcaseBusiness,
} from 'lucide-react';

import { DashboardStatCard } from './dashboard-stat-card';
import type { Citizen } from '../lib/dashboard-data';
import { getDashboardStatistics } from '../lib/dashboard-data';

interface DashboardStatisticsProps {
	citizens: Citizen[];
}

export const DashboardStatistics: React.FC<DashboardStatisticsProps> = ({
	citizens,
}) => {
	const statistics = getDashboardStatistics(citizens);

	return (
		<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
			<DashboardStatCard
				title='Всего граждан'
				value={statistics.total}
				description='В базе данных'
				icon={Users}
			/>

			<DashboardStatCard
				title='Мужчины'
				value={statistics.men}
				description={`${statistics.menPercentage}% от общего числа`}
				icon={UserRound}
			/>

			<DashboardStatCard
				title='Женщины'
				value={statistics.women}
				description={`${statistics.womenPercentage}% от общего числа`}
				icon={UserRoundCheck}
			/>

			<DashboardStatCard
				title='Работающие'
				value={statistics.working}
				description={`${statistics.workingPercentage}% от общего числа`}
				icon={BriefcaseBusiness}
			/>
		</div>
	);
};
