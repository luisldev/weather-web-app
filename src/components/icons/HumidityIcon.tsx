import type React from 'react';

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
	size?: number;
	strokeWidth?: number;
}

function HumidityIcon({ size = 24, strokeWidth = 2, ...props }: IconProps) {
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
			<path d='M12 22s8-7 8-12a8 8 0 0 0-16 0c0 5 8 12 8 12z' />
			<circle cx='12' cy='10' r='3' />
		</svg>
	);
}

export default HumidityIcon;
