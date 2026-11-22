import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ShieldCheck } from 'lucide-react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

import { Section } from './section';
import { Field } from './field';
import type { CitizenFormValues } from '../schema';

export const SocialStatusSection: React.FC = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<CitizenFormValues>();

	return (
		<Section
			title='Социальный статус'
			icon={<ShieldCheck className='h-4 w-4' />}
		>
			<Field
				label='Тип социального статуса'
				error={errors.socialStatus?.type?.message}
			>
				<Controller
					name='socialStatus.type'
					control={control}
					render={({ field }) => {
						const statuses = [
							'Работающий',
							'Пенсионер',
							'Студент',
							'Безработный',
							'Самозанятый',
						];

						return (
							<Select
								items={statuses.map(status => ({
									label: status,
									value: status,
								}))}
								value={field.value || null}
								onValueChange={value => field.onChange(value ?? '')}
							>
								<SelectTrigger className='h-8 min-h-8 w-full justify-between'>
									<SelectValue placeholder='Выберите статус' />
								</SelectTrigger>

								<SelectContent alignItemWithTrigger={false}>
									{statuses.map(status => (
										<SelectItem key={status} value={status}>
											{status}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						);
					}}
				/>
			</Field>

			<Field
				label='Категории поддержки'
				error={errors.socialStatus?.supportCategories?.message}
			>
				<Input
					{...register('socialStatus.supportCategories')}
					placeholder='Например: Многодетная семья'
					className='h-8'
				/>
			</Field>
		</Section>
	);
};
