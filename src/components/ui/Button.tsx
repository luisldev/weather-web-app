import type React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?:
		| 'neutral'
		| 'secondary'
		| 'success'
		| 'primary'
		| 'danger'
		| 'warning'
		| 'light';
	className?: string;
	children: React.ReactNode;
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
}

function Button({
	variant = 'neutral',
	className = '',
	children,
	icon,
	iconPosition = 'left',
	...props
}: ButtonProps) {
	const baseStyles =
		'inline-flex items-center gap-x-1 md:gap-x-2 text-sm font-medium rounded-lg border disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden px-2 md:px-4 py-1.5 md:py-2';

	const variants = {
		neutral:
			'bg-gray-800 text-white hover:bg-gray-900 focus:bg-gray-900 border-transparent dark:bg-white dark:text-neutral-800',
		secondary:
			'bg-gray-500 text-white hover:bg-gray-600 focus:bg-gray-600 border-transparent',
		success:
			'bg-teal-500 text-white hover:bg-teal-600 focus:bg-teal-600 border-transparent',
		primary:
			'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 border-transparent',
		danger:
			'bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 border-transparent',
		warning:
			'bg-yellow-500 text-white hover:bg-yellow-600 focus:bg-yellow-600 border-transparent',
		light:
			'bg-white text-gray-800 hover:bg-gray-200 focus:bg-gray-200 border-transparent',
	};

	const selectedVariantStyles = variants[variant] || variants.neutral;

	const allClassNames =
		`${baseStyles} ${selectedVariantStyles} ${className}`.trim();

	return (
		<button className={allClassNames} {...props}>
			{icon && iconPosition === 'left' && (
				<span className='-ml-0.5'>{icon}</span>
			)}
			{children}
			{icon && iconPosition === 'right' && (
				<span className='-mr-0.5'>{icon}</span>
			)}
		</button>
	);
}

export default Button;
