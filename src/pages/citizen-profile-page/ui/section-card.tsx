import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SectionCardProps {
	title: string;
	icon: React.ReactNode;
	children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
	title,
	icon,
	children,
}) => (
	<Card>
		<CardHeader>
			<CardTitle className='flex items-center gap-2 text-base'>
				{icon}
				{title}
			</CardTitle>
		</CardHeader>
		<CardContent>{children}</CardContent>
	</Card>
);
