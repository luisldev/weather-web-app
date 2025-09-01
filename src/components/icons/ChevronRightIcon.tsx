import type React from 'react';

interface ChevronRightIconProps extends React.SVGAttributes<SVGSVGElement> {
	className?: string;
}

function ChevronRightIcon({ className = '', ...props }: ChevronRightIconProps) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className={className}
			{...props}
		>
			<path d='m9 18 6-6-6-6'></path>
		</svg>
	);
}

export default ChevronRightIcon;
