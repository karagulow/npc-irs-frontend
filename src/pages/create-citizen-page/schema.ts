import { z } from 'zod';

const requiredString = z.string().trim().min(1, 'Обязательное поле');

export const citizenSchema = z.object({
	firstName: requiredString,
	lastName: requiredString,
	middleName: z.string(),
	birthDate: requiredString,
	gender: z.enum(['Мужской', 'Женский']),
	citizenship: requiredString,
	birthPlace: requiredString,
	registrationDistrict: requiredString,
	maritalStatus: requiredString,

	contacts: z.object({
		phone: z
			.string()
			.regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Введите корректный телефон'),
		email: z.string().trim().email('Введите корректный email'),
	}),

	addresses: z.object({
		registration: requiredString,
		actual: requiredString,
	}),

	family: z.array(
		z.object({
			fullName: requiredString,
			relationship: requiredString,
			birthDate: requiredString,
			employment: requiredString,
		}),
	),

	education: z.array(
		z.object({
			institution: requiredString,
			level: requiredString,
			specialty: requiredString,
			graduationYear: z.string().regex(/^\d{4}$/, 'Введите год в формате ГГГГ'),
		}),
	),

	employment: z.array(
		z.object({
			organization: requiredString,
			position: requiredString,
			status: requiredString,
			startDate: requiredString,
		}),
	),

	socialStatus: z.object({
		type: requiredString,
		supportCategories: z.string(),
	}),
});

export type CitizenFormValues = z.infer<typeof citizenSchema>;
