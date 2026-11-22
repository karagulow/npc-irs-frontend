import { ShieldCheck } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import { SectionCard } from './section-card';
import { InfoItem } from './info-item';
import { EmptyState } from './empty-state';
import { type Citizen } from '../types';

interface Props {
	citizen: Citizen;
}

export const SocialStatusSection: React.FC<Props> = ({ citizen }) => (
	<SectionCard
		title='Социальный статус'
		icon={<ShieldCheck className='h-4 w-4' />}
	>
		<div className='space-y-5'>
			<InfoItem label='Тип' value={citizen.socialStatus.type} />

			<div className='space-y-2'>
				<p className='text-sm text-muted-foreground'>Категории поддержки</p>

				{citizen.socialStatus.supportCategories.length ? (
					<div className='flex flex-wrap gap-2'>
						{citizen.socialStatus.supportCategories.map((category, index) => (
							<Badge key={index} variant='secondary'>
								{category}
							</Badge>
						))}
					</div>
				) : (
					<EmptyState />
				)}
			</div>
		</div>
	</SectionCard>
);
