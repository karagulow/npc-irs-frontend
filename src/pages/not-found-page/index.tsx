import React from 'react';
import { Link } from 'react-router-dom';

import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from '@/components/ui/empty';
import { Button } from '@/components/ui/button';

export const NotFoundPage: React.FC = () => {
	return (
		<div className='flex min-h-screen items-center justify-center p-4'>
			<Empty>
				<EmptyHeader>
					<EmptyTitle>404 - Страница не найдена</EmptyTitle>
					<EmptyDescription>Кажется, вы заблудились.</EmptyDescription>
					<EmptyContent>
						<Button>
							<Link to='/'>Вернуться на главную</Link>
						</Button>
					</EmptyContent>
				</EmptyHeader>
			</Empty>
		</div>
	);
};
