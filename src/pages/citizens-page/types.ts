export type Gender = 'Мужской' | 'Женский';

export type SocialStatusType =
	| 'Работающий'
	| 'Пенсионер'
	| 'Студент'
	| 'Безработный'
	| 'Самозанятый';

export interface CitizenFamilyMember {
	fullName: string;
	relationship: string;
	birthDate: string;
	employment: string;
}

export interface CitizenEducation {
	institution: string;
	level: string;
	specialty: string;
	graduationYear: number;
}

export interface CitizenEmployment {
	organization: string;
	position: string;
	status: string;
	startDate: string;
}

export interface Citizen {
	id: number;
	firstName: string;
	lastName: string;
	middleName: string;
	birthDate: string;
	gender: Gender;
	citizenship: string;
	birthPlace: string;
	registrationDistrict: string;
	maritalStatus: string;
	contacts: {
		phone: string;
		email: string;
	};
	addresses: {
		registration: string;
		actual: string;
	};
	family: CitizenFamilyMember[];
	education: CitizenEducation[];
	employment: CitizenEmployment[];
	socialStatus: {
		type: SocialStatusType;
		supportCategories: string[];
	};
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
	'Троицкий',
];

export const socialStatuses: SocialStatusType[] = [
	'Работающий',
	'Пенсионер',
	'Студент',
	'Безработный',
	'Самозанятый',
];
