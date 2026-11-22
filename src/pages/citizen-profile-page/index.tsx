import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import { type Citizen } from './types';
import { getAge } from './utils/formatters';
import { PersonalInfoSection } from './ui/personal-info-section';
import { ContactsSection } from './ui/contacts-section';
import { AddressesSection } from './ui/addresses-section';
import { FamilySection } from './ui/family-section';
import { EducationSection } from './ui/education-section';
import { EmploymentSection } from './ui/employment-section';
import { SocialStatusSection } from './ui/social-status-section';

import citizens from '@/data/citizens.json';

export const CitizenProfilePage: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const citizen = citizens.find(item => item.id === Number(id)) as
		| Citizen
		| undefined;

	if (!citizen) {
		return (
			<div className='space-y-4'>
				<Button variant='ghost' onClick={() => navigate('/citizens')}>
					<ArrowLeft className='mr-2 h-4 w-4' />К списку граждан
				</Button>

				<Card>
					<CardContent className='py-12 text-center'>
						Гражданин не найден
					</CardContent>
				</Card>
			</div>
		);
	}

	const fullName = [citizen.lastName, citizen.firstName, citizen.middleName]
		.filter(Boolean)
		.join(' ');

	return (
		<div className='space-y-6'>
			<div className='space-y-4'>
				<Button
					variant='ghost'
					className='-ml-3'
					onClick={() => navigate('/citizens')}
				>
					<ArrowLeft className='mr-2 h-4 w-4' />К списку граждан
				</Button>

				<div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
					<div className='flex items-start gap-4'>
						<div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted'>
							<UserRound className='h-7 w-7 text-muted-foreground' />
						</div>

						<div className='space-y-1'>
							<h1 className='text-2xl font-semibold tracking-tight'>
								{fullName}
							</h1>

							<p className='text-sm text-muted-foreground'>
								ID гражданина: {citizen.id}
							</p>

							<div className='flex flex-wrap gap-2 pt-1'>
								<Badge variant='secondary'>{citizen.socialStatus.type}</Badge>

								<Badge variant='outline'>{getAge(citizen.birthDate)} лет</Badge>
							</div>
						</div>
					</div>
				</div>
			</div>

			<PersonalInfoSection citizen={citizen} />
			<ContactsSection citizen={citizen} />
			<AddressesSection citizen={citizen} />
			<FamilySection citizen={citizen} />
			<EducationSection citizen={citizen} />
			<EmploymentSection citizen={citizen} />
			<SocialStatusSection citizen={citizen} />
		</div>
	);
};
