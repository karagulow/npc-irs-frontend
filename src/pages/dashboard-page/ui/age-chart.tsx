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
import { getAgeChartData } from '../lib/dashboard-data';

const chartConfig = {
	count: {
		label: 'Граждане',
		color: 'var(--chart-1)',
	},
} satisfies ChartConfig;

interface AgeChartProps {
	citizens: Citizen[];
}

export const AgeChart: React.FC<AgeChartProps> = ({ citizens }) => {
	const data = getAgeChartData(citizens);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Распределение по возрасту</CardTitle>
			</CardHeader>

			<CardContent>
				<ChartContainer config={chartConfig} className='h-70 w-full'>
					<BarChart
						data={data}
						margin={{
							top: 10,
							right: 10,
							left: -20,
							bottom: 0,
						}}
					>
						<CartesianGrid vertical={false} strokeDasharray='3 3' />

						<XAxis dataKey='age' tickLine={false} axisLine={false} />

						<YAxis tickLine={false} axisLine={false} allowDecimals={false} />

						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />

						<Bar
							dataKey='count'
							fill='var(--color-count)'
							radius={[5, 5, 0, 0]}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};
