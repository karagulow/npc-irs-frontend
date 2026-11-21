import { useMemo, useState } from 'react';

import { type Citizen } from '../types';

export type SortField = 'fullName' | 'birthDate' | 'registeredAt';
export type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 20;

interface UseCitizensTableProps {
	citizens: Citizen[];
}

export const useCitizensTable = ({ citizens }: UseCitizensTableProps) => {
	const [search, setSearch] = useState('');
	const [genderFilter, setGenderFilter] = useState('');
	const [districtFilter, setDistrictFilter] = useState('');
	const [statusFilter, setStatusFilter] = useState('');

	const [sortField, setSortField] = useState<SortField | null>(null);
	const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

	const [currentPage, setCurrentPage] = useState(1);

	const filteredCitizens = useMemo(() => {
		const result = citizens.filter(citizen => {
			const fullName =
				`${citizen.lastName} ${citizen.firstName} ${citizen.middleName}`.toLowerCase();

			const matchesSearch = fullName.includes(search.toLowerCase());
			const matchesGender = !genderFilter || citizen.gender === genderFilter;
			const matchesDistrict =
				!districtFilter || citizen.district === districtFilter;
			const matchesStatus =
				!statusFilter || citizen.socialStatus === statusFilter;

			return matchesSearch && matchesGender && matchesDistrict && matchesStatus;
		});

		if (!sortField) return result;

		return [...result].sort((a, b) => {
			let comparison = 0;

			switch (sortField) {
				case 'fullName': {
					const nameA = `${a.lastName} ${a.firstName} ${a.middleName}`;
					const nameB = `${b.lastName} ${b.firstName} ${b.middleName}`;

					comparison = nameA.localeCompare(nameB, 'ru');
					break;
				}

				case 'birthDate':
					comparison = a.birthDate.localeCompare(b.birthDate);
					break;

				case 'registeredAt':
					comparison = a.registeredAt.localeCompare(b.registeredAt);
					break;
			}

			return sortDirection === 'asc' ? comparison : -comparison;
		});
	}, [
		citizens,
		search,
		genderFilter,
		districtFilter,
		statusFilter,
		sortField,
		sortDirection,
	]);

	const paginatedCitizens = useMemo(() => {
		return filteredCitizens.slice(
			(currentPage - 1) * ITEMS_PER_PAGE,
			currentPage * ITEMS_PER_PAGE,
		);
	}, [filteredCitizens, currentPage]);

	const resetFilters = () => {
		setSearch('');
		setGenderFilter('');
		setDistrictFilter('');
		setStatusFilter('');
		setCurrentPage(1);
	};

	const handleSearchChange = (value: string) => {
		setSearch(value);
		setCurrentPage(1);
	};

	const handleGenderChange = (value: string) => {
		setGenderFilter(value);
		setCurrentPage(1);
	};

	const handleDistrictChange = (value: string) => {
		setDistrictFilter(value);
		setCurrentPage(1);
	};

	const handleStatusChange = (value: string) => {
		setStatusFilter(value);
		setCurrentPage(1);
	};

	const handleSort = (field: SortField) => {
		if (sortField === field) {
			setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
		} else {
			setSortField(field);
			setSortDirection('asc');
		}

		setCurrentPage(1);
	};

	const hasFilters = Boolean(
		search || genderFilter || districtFilter || statusFilter,
	);

	return {
		search,
		genderFilter,
		districtFilter,
		statusFilter,
		sortField,
		sortDirection,
		currentPage,
		itemsPerPage: ITEMS_PER_PAGE,
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
	};
};
