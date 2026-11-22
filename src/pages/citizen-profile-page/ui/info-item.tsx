import React from 'react';

interface InfoItemProps {
	label: string;
	value?: string | number | null;
}

export const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
	<div className='space-y-1'>
		<p className='text-sm text-muted-foreground'>{label}</p>
		<p className='text-sm font-medium wrap-break-word'>
			{value || 'Не указано'}
		</p>
	</div>
);
