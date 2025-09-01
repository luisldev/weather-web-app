import type React from 'react';

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
	size?: number;
	strokeWidth?: number;
}

function UvIndexIcon({ size = 24, strokeWidth = 2, ...props }: IconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={strokeWidth}
			strokeLinecap='round'
			strokeLinejoin='round'
			{...props}
		>
			<circle cx='12' cy='12' r='5' />
			<path d='M12 2v2' />
			<path d='M12 20v2' />
			<path d='M4.22 4.22l1.41 1.41' />
			<path d='M17.66 17.66l1.41 1.41' />
			<path d='M2 12h2' />
			<path d='M20 12h2' />
			<path d='M4.22 19.07l1.41-1.41' />
			<path d='M17.66 6.34l1.41-1.41' />
		</svg>
	);
}

export default UvIndexIcon;
