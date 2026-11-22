import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CitizensTable } from './ui/citizens-table';

export const CitizensPage: React.FC = () => {
	const navigate = useNavigate();

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

				<Button onClick={() => navigate('/citizens/new')}>
					<Plus size={17} />
					Добавить гражданина
				</Button>
			</div>

			<CitizensTable />
		</div>
	);
};
