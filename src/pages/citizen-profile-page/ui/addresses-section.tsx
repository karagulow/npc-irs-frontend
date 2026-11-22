import { MapPin } from 'lucide-react';

import { SectionCard } from './section-card';
import { InfoItem } from './info-item';
import { type Citizen } from '../types';

interface Props {
	citizen: Citizen;
}

export const AddressesSection: React.FC<Props> = ({ citizen }) => (
	<SectionCard title='Адреса' icon={<MapPin className='h-4 w-4' />}>
		<div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
			<InfoItem
				label='Адрес регистрации'
				value={citizen.addresses.registration}
			/>
			<InfoItem label='Фактический адрес' value={citizen.addresses.actual} />
		</div>
	</SectionCard>
);
