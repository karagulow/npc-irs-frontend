import { GraduationCap } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import { SectionCard } from './section-card';
import { InfoItem } from './info-item';
import { EmptyState } from './empty-state';
import { type Citizen } from '../types';

interface Props {
	citizen: Citizen;
}

export const EducationSection: React.FC<Props> = ({ citizen }) => (
	<SectionCard title='Образование' icon={<GraduationCap className='h-4 w-4' />}>
		{citizen.education.length ? (
			<div className='space-y-4'>
				{citizen.education.map((item, index) => (
					<div key={index}>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
							<InfoItem label='Учебное заведение' value={item.institution} />
							<InfoItem label='Уровень образования' value={item.level} />
							<InfoItem label='Специальность' value={item.specialty} />
							<InfoItem label='Год окончания' value={item.graduationYear} />
						</div>

						{index !== citizen.education.length - 1 && (
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
