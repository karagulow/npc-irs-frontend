import { BriefcaseBusiness } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import { SectionCard } from './section-card';
import { InfoItem } from './info-item';
import { EmptyState } from './empty-state';
import { type Citizen } from '../types';
import { formatDate } from '../utils/formatters';

interface Props {
	citizen: Citizen;
}

export const EmploymentSection: React.FC<Props> = ({ citizen }) => (
	<SectionCard title='Работа' icon={<BriefcaseBusiness className='h-4 w-4' />}>
		{citizen.employment.length ? (
			<div className='space-y-4'>
				{citizen.employment.map((item, index) => (
					<div key={index}>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
							<InfoItem label='Организация' value={item.organization} />
							<InfoItem label='Должность' value={item.position} />
							<InfoItem label='Статус занятости' value={item.status} />
							<InfoItem
								label='Дата начала работы'
								value={formatDate(item.startDate)}
							/>
						</div>

						{index !== citizen.employment.length - 1 && (
							<Separator className='mt-4' />
						)}
					</div>
				))}
			</div>
		) : (
			<EmptyState />
		)}
	</SectionCard>
);
