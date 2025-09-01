import type React from 'react';

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
	size?: number;
	strokeWidth?: number;
}

function VisibilityIcon({ size = 24, strokeWidth = 2, ...props }: IconProps) {
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
			<path d='M1 12s4-8 11-8s11 8 11 8s-4 8-11 8s-11-8-11-8z' />
			<circle cx='12' cy='12' r='3' />
		</svg>
	);
}

export default VisibilityIcon;
