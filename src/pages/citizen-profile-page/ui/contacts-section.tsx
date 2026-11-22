import { Phone } from 'lucide-react';

import { SectionCard } from './section-card';
import { InfoItem } from './info-item';
import { type Citizen } from '../types';

interface Props {
	citizen: Citizen;
}

export const ContactsSection: React.FC<Props> = ({ citizen }) => (
	<SectionCard
		title='Контактная информация'
		icon={<Phone className='h-4 w-4' />}
	>
		<div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
			<InfoItem label='Телефон' value={citizen.contacts.phone} />
			<InfoItem label='Электронная почта' value={citizen.contacts.email} />
		</div>
	</SectionCard>
);
