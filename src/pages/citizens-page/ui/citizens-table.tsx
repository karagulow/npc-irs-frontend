import React from 'react';
import { Link } from 'react-router-dom';
import { UserRound, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

import { type Citizen } from '../types';
import { CitizensFilters } from './citizens-filters';
import { CitizensPagination } from './citizens-pagination';
import { useCitizensTable, type SortField } from '../hooks/use-citizens-table';

import citizensData from '@/data/citizens.json';

const avatarColors = [
	'bg-blue-100 text-blue-700',
	'bg-violet-100 text-violet-700',
	'bg-emerald-100 text-emerald-700',
	'bg-amber-100 text-amber-700',
	'bg-rose-100 text-rose-700',
];

function getAge(birthDate: string): number {
	const birth = new Date(`${birthDate}T00:00:00`);
	const today = new Date();

	let age = today.getFullYear() - birth.getFullYear();

	const hasBirthdayPassed =
		today.getMonth() > birth.getMonth() ||
		(today.getMonth() === birth.getMonth() &&
			today.getDate() >= birth.getDate());

	if (!hasBirthdayPassed) age--;

	return age;
}

function formatDate(date: string): string {
	return new Date(`${date}T00:00:00`).toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
}

function getInitials(citizen: Citizen): string {
	return `${citizen.firstName[0]}${citizen.lastName[0]}`;
}

function getStatusColor(status: Citizen['socialStatus']['type']): string {
	switch (status) {
		case 'Работающий':
			return 'bg-emerald-50 text-emerald-700';
		case 'Пенсионер':
			return 'bg-blue-50 text-blue-700';
		case 'Студент':
			return 'bg-violet-50 text-violet-700';
		case 'Безработный':
			return 'bg-amber-50 text-amber-700';
		case 'Самозанятый':
			return 'bg-rose-50 text-rose-700';
		default:
			return 'bg-muted text-muted-foreground';
	}
}

export const CitizensTable: React.FC = () => {
	const citizens = citizensData as Citizen[];

	const {
		search,
		genderFilter,
		districtFilter,
		statusFilter,
		sortField,
		sortDirection,
		currentPage,
		itemsPerPage,
		filteredCitizens,
		paginatedCitizens,
		hasFilters,
		handleSearchChange,
		handleGenderChange,
		handleDistrictChange,
		handleStatusChange,
		handleSort,
		resetFilters,
		setCurrentPage,
	} = useCitizensTable({ citizens });

	const renderSortIcon = (field: SortField) => {
		if (sortField !== field) {
			return <ArrowUpDown size={14} />;
		}

		return sortDirection === 'asc' ? (
			<ArrowUp size={14} />
		) : (
			<ArrowDown size={14} />
		);
	};

	return (
		<div className='min-w-0 overflow-hidden rounded-xl border bg-card shadow-xs'>
			<CitizensFilters
				search={search}
				onSearchChange={handleSearchChange}
				genderFilter={genderFilter}
				onGenderChange={handleGenderChange}
				districtFilter={districtFilter}
				onDistrictChange={handleDistrictChange}
				statusFilter={statusFilter}
				onStatusChange={handleStatusChange}
				filteredCount={filteredCitizens.length}
				totalCount={citizens.length}
				onReset={resetFilters}
			/>

			<div className='w-full min-w-0 overflow-x-auto'>
				<table className='w-full min-w-212.5 text-sm'>
					<thead>
						<tr className='border-b bg-muted/40 text-left text-xs font-medium text-muted-foreground'>
							<th className='px-5 py-3.5 font-medium'>
								<button
									onClick={() => handleSort('fullName')}
									className='inline-flex items-center gap-2 transition-colors hover:text-foreground'
								>
									ФИО
									{renderSortIcon('fullName')}
								</button>
							</th>

							<th className='px-4 py-3.5 font-medium'>
								<button
									onClick={() => handleSort('birthDate')}
									className='inline-flex items-center gap-2 transition-colors hover:text-foreground'
								>
									Дата рождения
									{renderSortIcon('birthDate')}
								</button>
							</th>

							<th className='px-4 py-3.5 font-medium'>Пол</th>
							<th className='px-4 py-3.5 font-medium'>Район</th>
							<th className='px-4 py-3.5 font-medium'>Социальный статус</th>
						</tr>
					</thead>

					<tbody className='divide-y'>
						{paginatedCitizens.map(citizen => (
							<tr
								key={citizen.id}
								className='transition-colors hover:bg-muted/40'
							>
								<td className='px-5 py-3'>
									<div className='flex items-center gap-3'>
										<div
											className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
												avatarColors[(citizen.id - 1) % avatarColors.length]
											}`}
										>
											{getInitials(citizen)}
										</div>

										<div className='min-w-0'>
											<Link
												to={`/citizens/${citizen.id}`}
												className='truncate font-medium text-foreground transition-colors hover:text-primary hover:underline'
											>
												{citizen.lastName} {citizen.firstName}
											</Link>

											<p className='text-xs text-muted-foreground'>
												{citizen.middleName}
											</p>
										</div>
									</div>
								</td>

								<td className='px-4 py-3'>
									<div className='space-y-0.5'>
										<p>{formatDate(citizen.birthDate)}</p>
										<p className='text-xs text-muted-foreground'>
											{getAge(citizen.birthDate)} лет
										</p>
									</div>
								</td>

								<td className='px-4 py-3 text-muted-foreground'>
									{citizen.gender}
								</td>

								<td className='px-4 py-3'>{citizen.registrationDistrict}</td>

								<td className='px-4 py-3'>
									<span
										className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusColor(
											citizen.socialStatus.type,
										)}`}
									>
										{citizen.socialStatus.type}
									</span>
								</td>
							</tr>
						))}

						{paginatedCitizens.length === 0 && (
							<tr>
								<td colSpan={5} className='px-5 py-16 text-center'>
									<div className='flex flex-col items-center gap-2'>
										<div className='flex size-11 items-center justify-center rounded-full bg-muted'>
											<UserRound size={20} className='text-muted-foreground' />
										</div>

										<p className='font-medium'>Граждане не найдены</p>
										<p className='text-sm text-muted-foreground'>
											Попробуйте изменить параметры поиска или фильтры
										</p>

										{hasFilters && (
											<button
												onClick={resetFilters}
												className='mt-2 text-sm font-medium text-primary hover:underline'
											>
												Сбросить фильтры
											</button>
										)}
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<CitizensPagination
				currentPage={currentPage}
				totalItems={filteredCitizens.length}
				itemsPerPage={itemsPerPage}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
};
