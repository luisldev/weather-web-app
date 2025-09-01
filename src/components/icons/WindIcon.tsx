import type React from 'react';

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
	size?: number;
	strokeWidth?: number;
}

function WindIcon({ size = 24, strokeWidth = 2, ...props }: IconProps) {
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
			<path d='M12.5 8H21' />
			<path d='M3 8h5.5' />
			<path d='M3 16h18' />
			<path d='M14.5 12H21' />
			<path d='M3 12h7.5' />
		</svg>
	);
}

export default WindIcon;
