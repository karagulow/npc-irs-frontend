import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { BriefcaseBusiness, Plus, Trash2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Field } from './field';
import { DatePickerInput } from './date-picker-input';
import type { CitizenFormValues } from '../schema';

export const EmploymentSection: React.FC = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<CitizenFormValues>();

	const employmentFields = useFieldArray({
		control,
		name: 'employment',
	});

	return (
		<Card>
			<CardHeader>
				<div className='flex flex-wrap items-center justify-between gap-3'>
					<CardTitle className='flex items-center gap-2 text-base'>
						<BriefcaseBusiness className='h-4 w-4' />
						Работа
					</CardTitle>

					<Button
						type='button'
						size='sm'
						variant='outline'
						onClick={() =>
							employmentFields.append({
								organization: '',
								position: '',
								status: '',
								startDate: '',
							})
						}
					>
						<Plus className='mr-2 h-4 w-4' />
						Добавить
					</Button>
				</div>
			</CardHeader>

			<CardContent className='space-y-5'>
				{employmentFields.fields.length === 0 && (
					<p className='text-sm text-muted-foreground'>
						Добавьте сведения о работе
					</p>
				)}

				{employmentFields.fields.map((field, index) => (
					<div key={field.id} className='space-y-4'>
						<div className='flex items-center justify-between'>
							<p className='text-sm font-medium'>Место работы {index + 1}</p>

							<Button
								type='button'
								variant='ghost'
								size='icon'
								onClick={() => employmentFields.remove(index)}
							>
								<Trash2 className='h-4 w-4 text-destructive' />
							</Button>
						</div>

						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
							<Field
								label='Организация'
								error={errors.employment?.[index]?.organization?.message}
							>
								<Input
									{...register(`employment.${index}.organization`)}
									className='h-8'
								/>
							</Field>

							<Field
								label='Должность'
								error={errors.employment?.[index]?.position?.message}
							>
								<Input
									{...register(`employment.${index}.position`)}
									className='h-8'
								/>
							</Field>

							<Field
								label='Статус занятости'
								error={errors.employment?.[index]?.status?.message}
							>
								<Input
									{...register(`employment.${index}.status`)}
									className='h-8'
								/>
							</Field>

							<Field
								label='Дата начала работы'
								error={errors.employment?.[index]?.startDate?.message}
							>
								<Controller
									name={`employment.${index}.startDate`}
									control={control}
									render={({ field }) => (
										<DatePickerInput
											value={field.value}
											onChange={field.onChange}
										/>
									)}
								/>
							</Field>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
};
