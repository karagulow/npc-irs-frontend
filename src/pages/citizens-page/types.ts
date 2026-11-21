export type Gender = 'Мужской' | 'Женский';

export type SocialStatus =
	| 'Работающий'
	| 'Пенсионер'
	| 'Студент'
	| 'Безработный'
	| 'Инвалид';

export interface Citizen {
	id: number;
	firstName: string;
	lastName: string;
	middleName: string;
	birthDate: string;
	gender: Gender;
	district: string;
	socialStatus: SocialStatus;
	registeredAt: string;
}

export const districts = [
	'Центральный',
	'Северный',
	'Северо-Восточный',
	'Восточный',
	'Юго-Восточный',
	'Южный',
	'Юго-Западный',
	'Западный',
	'Северо-Западный',
	'Зеленоградский',
];

export const socialStatuses: SocialStatus[] = [
	'Работающий',
	'Пенсионер',
	'Студент',
	'Безработный',
	'Инвалид',
];
