import { Users } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import { SectionCard } from './section-card';
import { InfoItem } from './info-item';
import { EmptyState } from './empty-state';
import { type Citizen } from '../types';
import { formatDate } from '../utils/formatters';

interface Props {
	citizen: Citizen;
}

export const FamilySection: React.FC<Props> = ({ citizen }) => (
	<SectionCard title='Семья' icon={<Users className='h-4 w-4' />}>
		{citizen.family.length ? (
			<div className='space-y-4'>
				{citizen.family.map((member, index) => (
					<div key={index}>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
							<InfoItem label='ФИО' value={member.fullName} />
							<InfoItem label='Родство' value={member.relationship} />
							<InfoItem
								label='Дата рождения'
								value={formatDate(member.birthDate)}
							/>
							<InfoItem label='Занятость' value={member.employment} />
						</div>

						{index !== citizen.family.length - 1 && (
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
