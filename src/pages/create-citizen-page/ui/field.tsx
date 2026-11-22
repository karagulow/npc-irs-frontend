interface FieldProps {
	label: string;
	error?: string;
	children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({ label, error, children }) => (
	<div className='min-w-0 space-y-2'>
		<label className='text-sm font-medium'>{label}</label>
		{children}
		{error && <p className='text-xs text-destructive'>{error}</p>}
	</div>
);
