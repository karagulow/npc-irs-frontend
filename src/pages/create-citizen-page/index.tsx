import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/toast';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { citizenSchema, type CitizenFormValues } from './schema';
import { PersonalInfoSection } from './ui/personal-info-section';
import { ContactsSection } from './ui/contacts-section';
import { AddressesSection } from './ui/addresses-section';
import { SocialStatusSection } from './ui/social-status-section';
import { FamilySection } from './ui/family-section';
import { EducationSection } from './ui/EducationSection';
import { EmploymentSection } from './ui/employment-section';

const defaultValues: CitizenFormValues = {
	firstName: '',
	lastName: '',
	middleName: '',
	birthDate: '',
	gender: 'Мужской',
	citizenship: 'Российская Федерация',
	birthPlace: '',
	registrationDistrict: '',
	maritalStatus: '',

	contacts: {
		phone: '+7',
		email: '',
	},

	addresses: {
		registration: '',
		actual: '',
	},

	family: [],
	education: [],
	employment: [],

	socialStatus: {
		type: '',
		supportCategories: '',
	},
};

export const CreateCitizenPage: React.FC = () => {
	const navigate = useNavigate();

	const form = useForm<CitizenFormValues>({
		resolver: zodResolver(citizenSchema),
		defaultValues,
	});

	const onSubmit = (_data: CitizenFormValues) => {
		toast.add({
			type: 'success',
			description: 'Гражданин успешно добавлен.',
		});

		navigate('/citizens');
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<div className='space-y-4'>
					<Button
						type='button'
						variant='ghost'
						className='-ml-3'
						onClick={() => navigate('/citizens')}
					>
						<ArrowLeft className='mr-2 h-4 w-4' />К списку граждан
					</Button>

					<div>
						<h1 className='text-2xl font-semibold tracking-tight'>
							Добавление гражданина
						</h1>
						<p className='mt-1 text-sm text-muted-foreground'>
							Заполните информацию о новом гражданине
						</p>
					</div>
				</div>

				<PersonalInfoSection />
				<ContactsSection />
				<AddressesSection />
				<FamilySection />
				<EducationSection />
				<EmploymentSection />
				<SocialStatusSection />

				<div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
					<Button
						type='button'
						variant='outline'
						onClick={() => navigate('/citizens')}
					>
						Отмена
					</Button>

					<Button type='submit'>Добавить гражданина</Button>
				</div>
			</form>
		</FormProvider>
	);
};
