import React, { useState } from 'react';
import { Plus } from 'lucide-react';

import { CitizensTable } from './ui/citizens-table';
import { type Citizen } from './types';

import citizensData from '@/data/citizens.json';

export const CitizensPage: React.FC = () => {
	const [citizens, setCitizens] = useState<Citizen[]>(
		citizensData as Citizen[],
	);

	return (
		<div className='space-y-6'>
			<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
				<div>
					<h1 className='text-2xl font-semibold tracking-tight'>
						Реестр граждан
					</h1>
					<p className='mt-1 text-sm text-muted-foreground'>
						Управление и учет зарегистрированных граждан
					</p>
				</div>

				<button className='inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90'>
					<Plus size={17} />
					Добавить гражданина
				</button>
			</div>

			<CitizensTable citizens={citizens} />
		</div>
	);
};
