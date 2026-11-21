import React from 'react';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

interface CitizensPaginationProps {
	currentPage: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
}

export const CitizensPagination: React.FC<CitizensPaginationProps> = ({
	currentPage,
	totalItems,
	itemsPerPage,
	onPageChange,
}) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const pages = Array.from(
		new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages]),
	)
		.filter(page => page >= 1 && page <= totalPages)
		.sort((a, b) => a - b);

	return (
		<div className='flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href='#'
							onClick={event => {
								event.preventDefault();

								if (currentPage > 1) {
									onPageChange(currentPage - 1);
								}
							}}
							aria-disabled={currentPage <= 1}
							className={
								currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined
							}
							text='Назад'
						/>
					</PaginationItem>

					{pages.map((page, index) => {
						const previousPage = pages[index - 1];

						return (
							<React.Fragment key={page}>
								{previousPage && page - previousPage > 1 && (
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
								)}

								<PaginationItem>
									<PaginationLink
										href='#'
										isActive={page === currentPage}
										onClick={event => {
											event.preventDefault();
											onPageChange(page);
										}}
									>
										{page}
									</PaginationLink>
								</PaginationItem>
							</React.Fragment>
						);
					})}

					<PaginationItem>
						<PaginationNext
							href='#'
							onClick={event => {
								event.preventDefault();

								if (currentPage < totalPages) {
									onPageChange(currentPage + 1);
								}
							}}
							aria-disabled={currentPage >= totalPages}
							className={
								currentPage >= totalPages
									? 'pointer-events-none opacity-50'
									: undefined
							}
							text='Далее'
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};
