import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Field } from './field';
import type { CitizenFormValues } from '../schema';

export const EducationSection: React.FC = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<CitizenFormValues>();

	const educationFields = useFieldArray({
		control,
		name: 'education',
	});

	return (
		<Card>
			<CardHeader>
				<div className='flex flex-wrap items-center justify-between gap-3'>
					<CardTitle className='flex items-center gap-2 text-base'>
						<GraduationCap className='h-4 w-4' />
						Образование
					</CardTitle>

					<Button
						type='button'
						size='sm'
						variant='outline'
						onClick={() =>
							educationFields.append({
								institution: '',
								level: '',
								specialty: '',
								graduationYear: '',
							})
						}
					>
						<Plus className='mr-2 h-4 w-4' />
						Добавить
					</Button>
				</div>
			</CardHeader>

			<CardContent className='space-y-5'>
				{educationFields.fields.length === 0 && (
					<p className='text-sm text-muted-foreground'>
						Добавьте сведения об образовании
					</p>
				)}

				{educationFields.fields.map((field, index) => (
					<div key={field.id} className='space-y-4'>
						<div className='flex items-center justify-between'>
							<p className='text-sm font-medium'>Образование {index + 1}</p>

							<Button
								type='button'
								variant='ghost'
								size='icon'
								onClick={() => educationFields.remove(index)}
							>
								<Trash2 className='h-4 w-4 text-destructive' />
							</Button>
						</div>

						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
							<Field
								label='Учебное заведение'
								error={errors.education?.[index]?.institution?.message}
							>
								<Input
									{...register(`education.${index}.institution`)}
									className='h-8'
								/>
							</Field>

							<Field
								label='Уровень образования'
								error={errors.education?.[index]?.level?.message}
							>
								<Input
									{...register(`education.${index}.level`)}
									className='h-8'
								/>
							</Field>

							<Field
								label='Специальность'
								error={errors.education?.[index]?.specialty?.message}
							>
								<Input
									{...register(`education.${index}.specialty`)}
									className='h-8'
								/>
							</Field>

							<Field
								label='Год окончания'
								error={errors.education?.[index]?.graduationYear?.message}
							>
								<Input
									{...register(`education.${index}.graduationYear`)}
									inputMode='numeric'
									maxLength={4}
									placeholder='2007'
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
