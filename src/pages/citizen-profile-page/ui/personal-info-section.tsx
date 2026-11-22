import { UserRound } from 'lucide-react';

import { SectionCard } from './section-card';
import { InfoItem } from './info-item';
import { type Citizen } from '../types';
import { formatDate, getAge } from '../utils/formatters';

interface Props {
	citizen: Citizen;
}

export const PersonalInfoSection: React.FC<Props> = ({ citizen }) => (
	<SectionCard title='Личные данные' icon={<UserRound className='h-4 w-4' />}>
		<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
			<InfoItem label='Фамилия' value={citizen.lastName} />
			<InfoItem label='Имя' value={citizen.firstName} />
			<InfoItem label='Отчество' value={citizen.middleName} />
			<InfoItem label='Дата рождения' value={formatDate(citizen.birthDate)} />
			<InfoItem label='Возраст' value={`${getAge(citizen.birthDate)} лет`} />
			<InfoItem label='Пол' value={citizen.gender} />
			<InfoItem label='Гражданство' value={citizen.citizenship} />
			<InfoItem label='Место рождения' value={citizen.birthPlace} />
			<InfoItem
				label='Район регистрации'
				value={citizen.registrationDistrict}
			/>
			<InfoItem label='Семейное положение' value={citizen.maritalStatus} />
		</div>
	</SectionCard>
);
