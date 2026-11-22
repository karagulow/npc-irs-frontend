import citizensData from '@/data/citizens.json';

export interface Citizen {
	id: number;
	firstName: string;
	lastName: string;
	middleName?: string;
	birthDate: string;
	gender: string;
	registrationDistrict?: string;
	socialStatus?: {
		type?: string;
	};
}

export const citizens = citizensData as Citizen[];

export const getAge = (birthDate: string): number => {
	const [year, month, day] = birthDate.split('-').map(Number);
	const today = new Date();

	let age = today.getFullYear() - year;

	if (
		today.getMonth() + 1 < month ||
		(today.getMonth() + 1 === month && today.getDate() < day)
	) {
		age--;
	}

	return age;
};

export const getDashboardStatistics = (data: Citizen[]) => {
	const total = data.length;

	const men = data.filter(citizen => citizen.gender === 'Мужской').length;
	const women = data.filter(citizen => citizen.gender === 'Женский').length;
	const working = data.filter(
		citizen => citizen.socialStatus?.type === 'Работающий',
	).length;

	const getPercentage = (value: number) =>
		total ? ((value / total) * 100).toFixed(1) : '0';

	return {
		total,
		men,
		women,
		working,
		menPercentage: getPercentage(men),
		womenPercentage: getPercentage(women),
		workingPercentage: getPercentage(working),
	};
};

export const getAgeChartData = (data: Citizen[]) => {
	const groups = [
		{ age: '0–17', min: 0, max: 17 },
		{ age: '18–29', min: 18, max: 29 },
		{ age: '30–44', min: 30, max: 44 },
		{ age: '45–59', min: 45, max: 59 },
		{ age: '60+', min: 60, max: Infinity },
	];

	return groups.map(group => ({
		age: group.age,
		count: data.filter(citizen => {
			const age = getAge(citizen.birthDate);
			return age >= group.min && age <= group.max;
		}).length,
	}));
};

export const getSocialStatusChartData = (data: Citizen[]) => {
	const counts = data.reduce<Record<string, number>>((acc, citizen) => {
		const status = citizen.socialStatus?.type || 'Не указан';

		acc[status] = (acc[status] || 0) + 1;

		return acc;
	}, {});

	return Object.entries(counts)
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count);
};

export const getDistrictChartData = (data: Citizen[]) => {
	const counts = data.reduce<Record<string, number>>((acc, citizen) => {
		const district = citizen.registrationDistrict || 'Не указан';

		acc[district] = (acc[district] || 0) + 1;

		return acc;
	}, {});

	return Object.entries(counts)
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count);
};

export const getGenderChartData = (
	statistics: ReturnType<typeof getDashboardStatistics>,
) => [
	{
		name: 'Мужской',
		value: statistics.men,
		fill: 'var(--color-Мужской)',
	},
	{
		name: 'Женский',
		value: statistics.women,
		fill: 'var(--color-Женский)',
	},
];
