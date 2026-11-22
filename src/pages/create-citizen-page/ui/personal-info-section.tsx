import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { UserRound } from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Section } from './section';
import { Field } from './field';
import { DatePickerInput } from './date-picker-input';
import type { CitizenFormValues } from '../schema';

export const PersonalInfoSection: React.FC = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<CitizenFormValues>();

	return (
		<Section title='Личные данные' icon={<UserRound className='h-4 w-4' />}>
			<Field label='Фамилия' error={errors.lastName?.message}>
				<Input {...register('lastName')} placeholder='Иванов' className='h-8' />
			</Field>

			<Field label='Имя' error={errors.firstName?.message}>
				<Input
					{...register('firstName')}
					placeholder='Александр'
					className='h-8'
				/>
			</Field>

			<Field label='Отчество' error={errors.middleName?.message}>
				<Input
					{...register('middleName')}
					placeholder='Александрович'
					className='h-8'
				/>
			</Field>

			<Field label='Дата рождения' error={errors.birthDate?.message}>
				<Controller
					name='birthDate'
					control={control}
					render={({ field }) => (
						<DatePickerInput value={field.value} onChange={field.onChange} />
					)}
				/>
			</Field>

			<Field label='Пол' error={errors.gender?.message}>
				<Controller
					name='gender'
					control={control}
					render={({ field }) => (
						<Select
							items={[
								{ label: 'Мужской', value: 'Мужской' },
								{ label: 'Женский', value: 'Женский' },
							]}
							value={field.value}
							onValueChange={value => field.onChange(value)}
						>
							<SelectTrigger className='h-8 min-h-8 w-full justify-between'>
								<SelectValue placeholder='Выберите пол' />
							</SelectTrigger>

							<SelectContent alignItemWithTrigger={false}>
								<SelectItem value='Мужской'>Мужской</SelectItem>
								<SelectItem value='Женский'>Женский</SelectItem>
							</SelectContent>
						</Select>
					)}
				/>
			</Field>

			<Field label='Гражданство' error={errors.citizenship?.message}>
				<Input {...register('citizenship')} className='h-8' />
			</Field>

			<Field label='Место рождения' error={errors.birthPlace?.message}>
				<Input
					{...register('birthPlace')}
					placeholder='г. Москва'
					className='h-8'
				/>
			</Field>

			<Field
				label='Район регистрации'
				error={errors.registrationDistrict?.message}
			>
				<Controller
					name='registrationDistrict'
					control={control}
					render={({ field }) => {
						const districts = [
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

						return (
							<Select
								items={districts.map(district => ({
									label: district,
									value: district,
								}))}
								value={field.value || null}
								onValueChange={value => field.onChange(value ?? '')}
							>
								<SelectTrigger className='h-8 min-h-8 w-full justify-between'>
									<SelectValue placeholder='Выберите район' />
								</SelectTrigger>

								<SelectContent alignItemWithTrigger={false}>
									{districts.map(district => (
										<SelectItem key={district} value={district}>
											{district}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						);
					}}
				/>
			</Field>

			<Field label='Семейное положение' error={errors.maritalStatus?.message}>
				<Controller
					name='maritalStatus'
					control={control}
					render={({ field }) => {
						const statuses = [
							'Не женат / не замужем',
							'Женат',
							'Замужем',
							'Разведен',
							'Вдовец',
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
		</Section>
	);
};
