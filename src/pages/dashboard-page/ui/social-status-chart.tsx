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
import { getSocialStatusChartData } from '../lib/dashboard-data';

const chartConfig = {
	count: {
		label: 'Граждане',
		color: 'var(--chart-2)',
	},
} satisfies ChartConfig;

interface SocialStatusChartProps {
	citizens: Citizen[];
}

export const SocialStatusChart: React.FC<SocialStatusChartProps> = ({
	citizens,
}) => {
	const data = getSocialStatusChartData(citizens);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Социальный статус</CardTitle>
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
