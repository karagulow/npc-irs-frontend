import { CalendarIcon } from 'lucide-react';
import { ru } from 'date-fns/locale';

import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
	value?: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export const DatePickerInput: React.FC<DatePickerProps> = ({
	value,
	onChange,
	placeholder = 'Выберите дату',
}) => {
	const selectedDate = value
		? (() => {
				const [year, month, day] = value.split('-').map(Number);
				return new Date(year, month - 1, day);
			})()
		: undefined;

	return (
		<Popover>
			<PopoverTrigger className='flex h-8 w-full items-center justify-start rounded-md border border-input bg-background px-3 text-left text-sm font-normal'>
				<CalendarIcon className='mr-2 h-4 w-4' />
				{selectedDate ? (
					selectedDate.toLocaleDateString('ru-RU')
				) : (
					<span className='text-muted-foreground'>{placeholder}</span>
				)}
			</PopoverTrigger>

			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					mode='single'
					selected={selectedDate}
					onSelect={date => {
						if (!date) return;

						const year = date.getFullYear();
						const month = String(date.getMonth() + 1).padStart(2, '0');
						const day = String(date.getDate()).padStart(2, '0');

						onChange(`${year}-${month}-${day}`);
					}}
					locale={ru}
				/>
			</PopoverContent>
		</Popover>
	);
};
