import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart';

import type { Citizen } from '../lib/dashboard-data';
import { getDistrictChartData } from '../lib/dashboard-data';

const chartConfig = {
	count: {
		label: 'Граждане',
		color: 'var(--chart-3)',
	},
} satisfies ChartConfig;

interface DistrictChartProps {
	citizens: Citizen[];
}

export const DistrictChart: React.FC<DistrictChartProps> = ({ citizens }) => {
	const data = getDistrictChartData(citizens);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Распределение по районам</CardTitle>
			</CardHeader>

			<CardContent>
				<ChartContainer config={chartConfig} className='h-70 w-full'>
					<BarChart
						data={data}
						layout='vertical'
						margin={{
							top: 0,
							right: 10,
							left: 10,
							bottom: 0,
						}}
					>
						<CartesianGrid horizontal={false} />

						<XAxis type='number' allowDecimals={false} hide />

						<YAxis
							type='category'
							dataKey='name'
							tickLine={false}
							axisLine={false}
							width={110}
						/>

						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />

						<Bar
							dataKey='count'
							fill='var(--color-count)'
							radius={[0, 5, 5, 0]}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};
