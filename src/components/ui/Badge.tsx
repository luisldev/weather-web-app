import type React from 'react';

interface BadgeProps {
	variant?:
		| 'neutral'
		| 'secondary'
		| 'success'
		| 'primary'
		| 'danger'
		| 'warning';
	className?: string;
	children: React.ReactNode;
	onRemove?: () => void;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Badge({
	variant = 'neutral',
	className = '',
	children,
	onRemove,
	onClick,
	...props
}: BadgeProps) {
	const baseStyles =
		'w-max inline-flex items-center gap-x-1 rounded-lg sm:rounded-full text-xs font-medium';

	const variants = {
		neutral: 'bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white',
		secondary: 'bg-gray-50 text-gray-500 dark:bg-white/10 dark:text-white',
		success: 'bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500',
		primary: 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500',
		danger: 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500',
		warning:
			'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500',
	};

	const selectedVariantStyles = variants[variant] || variants.neutral;

	const paddingRightClass = onRemove ? 'pe-1' : '';

	const allClassNames =
		`${baseStyles} ${selectedVariantStyles} ${paddingRightClass} ${className}`.trim();

	return (
		<div className={allClassNames} {...props}>
			{onClick && (
				<button
					className='flex-grow text-left cursor-pointer py-1.5 pl-3 hover:opacity-80'
					type='button'
					onClick={onClick}
				>
					{children}
				</button>
			)}
			{!onClick && (
				<span className='py-1.5 px-3 hover:opacity-90'>{children}</span>
			)}
			{onRemove && (
				<button
					type='button'
					onClick={(e) => {
						e.stopPropagation();
						onRemove();
					}}
					className='ml-0.5 -me-0.5 mr-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-150 ease-in text-gray-500 hover:text-gray-900 dark:text-white/70'
					aria-label='Eliminar item'
				>
					<svg
						className='h-3 w-3'
						stroke='currentColor'
						fill='none'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
				</button>
			)}
		</div>
	);
}

export default Badge;
