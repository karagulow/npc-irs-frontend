import React from 'react';
import { Pie, PieChart, Cell } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart';

import type { Citizen } from '../lib/dashboard-data';
import {
	getDashboardStatistics,
	getGenderChartData,
} from '../lib/dashboard-data';

const chartConfig = {
	Мужской: {
		label: 'Мужчины',
		color: 'var(--chart-1)',
	},
	Женский: {
		label: 'Женщины',
		color: 'var(--chart-2)',
	},
} satisfies ChartConfig;

interface GenderChartProps {
	citizens: Citizen[];
}

export const GenderChart: React.FC<GenderChartProps> = ({ citizens }) => {
	const statistics = getDashboardStatistics(citizens);
	const data = getGenderChartData(statistics);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Распределение по полу</CardTitle>
			</CardHeader>

			<CardContent>
				<ChartContainer config={chartConfig} className='mx-auto h-70 w-full'>
					<PieChart>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />

						<Pie
							data={data}
							dataKey='value'
							nameKey='name'
							innerRadius={65}
							outerRadius={100}
							paddingAngle={3}
						>
							{data.map(entry => (
								<Cell key={entry.name} fill={entry.fill} />
							))}
						</Pie>
					</PieChart>
				</ChartContainer>

				<div className='flex justify-center gap-6 text-sm'>
					<div className='flex items-center gap-2'>
						<div className='bg-chart-1 size-2.5 rounded-full' />
						Мужчины
					</div>

					<div className='flex items-center gap-2'>
						<div className='bg-chart-2 size-2.5 rounded-full' />
						Женщины
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
