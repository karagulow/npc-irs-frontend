import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { districts, socialStatuses } from '../types';

interface CitizensFiltersProps {
	search: string;
	onSearchChange: (value: string) => void;

	genderFilter: string;
	onGenderChange: (value: string) => void;

	districtFilter: string;
	onDistrictChange: (value: string) => void;

	statusFilter: string;
	onStatusChange: (value: string) => void;

	filteredCount: number;
	totalCount: number;
	onReset: () => void;
}

export const CitizensFilters: React.FC<CitizensFiltersProps> = ({
	search,
	onSearchChange,
	genderFilter,
	onGenderChange,
	districtFilter,
	onDistrictChange,
	statusFilter,
	onStatusChange,
	filteredCount,
	totalCount,
	onReset,
}) => {
	const hasFilters = search || genderFilter || districtFilter || statusFilter;

	return (
		<div className='flex flex-col gap-3 border-b p-4'>
			<div className='flex flex-col gap-3 lg:flex-row lg:justify-between'>
				<div className='relative w-full lg:max-w-sm lg:flex-1'>
					<Search
						size={17}
						className='pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground'
					/>

					<Input
						value={search}
						onChange={e => onSearchChange(e.target.value)}
						placeholder='Поиск по ФИО...'
						className='h-8 min-h-8 pl-8'
					/>
				</div>

				<div className='flex flex-wrap items-center gap-2'>
					<Select
						items={[
							{ label: 'Все', value: 'all' },
							{ label: 'Мужской', value: 'Мужской' },
							{ label: 'Женский', value: 'Женский' },
						]}
						value={genderFilter || 'all'}
						onValueChange={value =>
							onGenderChange(value === 'all' || value === null ? '' : value)
						}
					>
						<SelectTrigger className='h-8 min-h-8 w-36 shrink-0 justify-between'>
							<SelectValue placeholder='Пол' />
						</SelectTrigger>
						<SelectContent alignItemWithTrigger={false}>
							<SelectItem value='all'>Все</SelectItem>
							<SelectItem value='Мужской'>Мужской</SelectItem>
							<SelectItem value='Женский'>Женский</SelectItem>
						</SelectContent>
					</Select>

					<Select
						items={[
							{ label: 'Все районы', value: 'all' },
							...districts.map(district => ({
								label: district,
								value: district,
							})),
						]}
						value={districtFilter || 'all'}
						onValueChange={value =>
							onDistrictChange(value === 'all' || value === null ? '' : value)
						}
					>
						<SelectTrigger className='h-8 min-h-8 w-40 shrink-0 justify-between'>
							<SelectValue placeholder='Все районы' />
						</SelectTrigger>
						<SelectContent alignItemWithTrigger={false}>
							<SelectItem value='all'>Все районы</SelectItem>
							{districts.map(district => (
								<SelectItem key={district} value={district}>
									{district}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select
						items={[
							{ label: 'Все статусы', value: 'all' },
							...socialStatuses.map(status => ({
								label: status,
								value: status,
							})),
						]}
						value={statusFilter || 'all'}
						onValueChange={value =>
							onStatusChange(value === 'all' || value === null ? '' : value)
						}
					>
						<SelectTrigger className='h-8 min-h-8 w-42.5 shrink-0 justify-between'>
							<SelectValue placeholder='Все статусы' />
						</SelectTrigger>
						<SelectContent alignItemWithTrigger={false}>
							<SelectItem value='all'>Все статусы</SelectItem>
							{socialStatuses.map(status => (
								<SelectItem key={status} value={status}>
									{status}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className='flex flex-wrap items-center justify-between gap-3'>
				<div className='flex flex-wrap items-center gap-3'>
					<div className='flex items-center gap-2 h-8 text-sm text-muted-foreground'>
						<SlidersHorizontal size={15} />
						<span>
							Найдено:{' '}
							<span className='font-medium text-foreground'>
								{filteredCount}
							</span>
						</span>
					</div>

					{hasFilters && (
						<Button variant='ghost' onClick={onReset}>
							<X size={15} />
							Сбросить фильтры
						</Button>
					)}
				</div>

				<span className='text-xs text-muted-foreground'>
					Всего записей: {totalCount}
				</span>
			</div>
		</div>
	);
};
