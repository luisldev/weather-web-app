interface WeatherItemProps {
	title: string;
	value: number;
	units?: string;
	description?: string;
}

function WeatherCurrentItems({
	title,
	value,
	units,
	description,
}: WeatherItemProps) {
	return (
		<div className='flex flex-row items-center justify-between flex-wrap bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-2 shadow-sm'>
			<div className='flex items-center gap-2'>
				<p className='text-sm opacity-60'>{title}</p>
			</div>
			<div className='flex flex-row items-end'>
				<p className='font-bold'>
					<span>
						{value}
						{units && <span className=''>{units}</span>}
					</span>
					{description && (
						<span className='opacity-50 font-medium text-sm'>
							{' '}
							- {description}
						</span>
					)}
				</p>
			</div>
		</div>
	);
}
export default WeatherCurrentItems;
