import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Phone } from 'lucide-react';

import { Input } from '@/components/ui/input';

import { Field } from './field';
import { Section } from './section';
import type { CitizenFormValues } from '../schema';

const formatPhone = (value: string) => {
	let digits = value.replace(/\D/g, '');

	if (digits.startsWith('7') || digits.startsWith('8')) {
		digits = digits.slice(1);
	}

	digits = digits.slice(0, 10);

	let result = '+7';

	if (digits.length > 0) result += ` (${digits.slice(0, 3)}`;
	if (digits.length >= 3) result += ')';
	if (digits.length > 3) result += ` ${digits.slice(3, 6)}`;
	if (digits.length > 6) result += `-${digits.slice(6, 8)}`;
	if (digits.length > 8) result += `-${digits.slice(8, 10)}`;

	return result;
};

export const ContactsSection: React.FC = () => {
	const {
		register,
		setValue,
		formState: { errors },
	} = useFormContext<CitizenFormValues>();

	const phoneRegister = register('contacts.phone', {
		onChange: event => {
			setValue('contacts.phone', formatPhone(event.target.value), {
				shouldValidate: true,
			});
		},
	});

	return (
		<Section title='Контактная информация' icon={<Phone className='h-4 w-4' />}>
			<Field label='Телефон' error={errors.contacts?.phone?.message}>
				<Input
					{...phoneRegister}
					type='tel'
					placeholder='+7 (999) 123-45-67'
					className='h-8'
				/>
			</Field>

			<Field label='Электронная почта' error={errors.contacts?.email?.message}>
				<Input
					{...register('contacts.email')}
					type='email'
					placeholder='example@mail.ru'
					className='h-8'
				/>
			</Field>
		</Section>
	);
};
