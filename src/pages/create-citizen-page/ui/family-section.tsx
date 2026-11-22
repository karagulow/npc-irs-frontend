import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Trash2, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Field } from './field';
import { DatePickerInput } from './date-picker-input';
import type { CitizenFormValues } from '../schema';

export const FamilySection: React.FC = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<CitizenFormValues>();

	const familyFields = useFieldArray({
		control,
		name: 'family',
	});

	return (
		<Card>
			<CardHeader>
				<div className='flex flex-wrap items-center justify-between gap-3'>
					<CardTitle className='flex items-center gap-2 text-base'>
						<Users className='h-4 w-4' />
						Семья
					</CardTitle>

					<Button
						type='button'
						size='sm'
						variant='outline'
						onClick={() =>
							familyFields.append({
								fullName: '',
								relationship: '',
								birthDate: '',
								employment: '',
							})
						}
					>
						<Plus className='mr-2 h-4 w-4' />
						Добавить
					</Button>
				</div>
			</CardHeader>

			<CardContent className='space-y-5'>
				{familyFields.fields.length === 0 && (
					<p className='text-sm text-muted-foreground'>
						Добавьте членов семьи, если такая информация есть
					</p>
				)}

				{familyFields.fields.map((field, index) => (
					<div key={field.id} className='space-y-4'>
						<div className='flex items-center justify-between'>
							<p className='text-sm font-medium'>Член семьи {index + 1}</p>

							<Button
								type='button'
								variant='ghost'
								size='icon'
								onClick={() => familyFields.remove(index)}
							>
								<Trash2 className='h-4 w-4 text-destructive' />
							</Button>
						</div>

						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
							<Field
								label='ФИО'
								error={errors.family?.[index]?.fullName?.message}
							>
								<Input
									{...register(`family.${index}.fullName`)}
									className='h-8'
								/>
							</Field>

							<Field
								label='Родство'
								error={errors.family?.[index]?.relationship?.message}
							>
								<Input
									{...register(`family.${index}.relationship`)}
									className='h-8'
								/>
							</Field>

							<Field
								label='Дата рождения'
								error={errors.family?.[index]?.birthDate?.message}
							>
								<Controller
									name={`family.${index}.birthDate`}
									control={control}
									render={({ field }) => (
										<DatePickerInput
											value={field.value}
											onChange={field.onChange}
										/>
									)}
								/>
							</Field>

							<Field
								label='Занятость'
								error={errors.family?.[index]?.employment?.message}
							>
								<Input
									{...register(`family.${index}.employment`)}
									className='h-8'
								/>
							</Field>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
};
