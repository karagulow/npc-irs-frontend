import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Section: React.FC<{
	title: string;
	icon: React.ReactNode;
	children: React.ReactNode;
}> = ({ title, icon, children }) => (
	<Card>
		<CardHeader>
			<CardTitle className='flex items-center gap-2 text-base'>
				{icon}
				{title}
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
				{children}
			</div>
		</CardContent>
	</Card>
);
