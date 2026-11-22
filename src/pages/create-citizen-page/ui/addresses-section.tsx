import React from 'react';
import { useFormContext } from 'react-hook-form';
import { MapPin } from 'lucide-react';

import { Input } from '@/components/ui/input';

import { Field } from './field';
import { Section } from './section';
import type { CitizenFormValues } from '../schema';

export const AddressesSection: React.FC = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<CitizenFormValues>();

	return (
		<Section title='Адреса' icon={<MapPin className='h-4 w-4' />}>
			<Field
				label='Адрес регистрации'
				error={errors.addresses?.registration?.message}
			>
				<Input
					{...register('addresses.registration')}
					placeholder='г. Москва, ул. Тверская, д. 10'
					className='h-8'
				/>
			</Field>

			<Field
				label='Фактический адрес'
				error={errors.addresses?.actual?.message}
			>
				<Input
					{...register('addresses.actual')}
					placeholder='г. Москва, ул. Арбат, д. 15'
					className='h-8'
				/>
			</Field>
		</Section>
	);
};
