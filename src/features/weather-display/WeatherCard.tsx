import type { Interval } from '@/types/WeatherTypes';
import { getCondition } from '@/utils/descriptors/getCondition';

interface WeatherCardProps {
	data: Interval;
	type: 'hourly' | 'daily';
}

function WeatherCard({ data, type }: WeatherCardProps) {
	let timeContent: string | null = null;
	let temperatureContent: number | null = null;
	let conditionContent: string | null = null;

	timeContent = data.startTime;
	temperatureContent = data.values.temperature;

	if (type === 'hourly') {
		conditionContent = getCondition(data.values.weatherCode, 'weatherCode');
	} else if (type === 'daily') {
		conditionContent = data.values.weatherCodeFullDay
			? getCondition(data.values.weatherCodeFullDay, 'weatherCodeFullDay')
			: getCondition(data.values.weatherCode, 'weatherCode');
	}

	return (
		<div className='flex flex-col items-center justify-between p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 transition-all duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 shadow-sm w-48 min-h-36 flex-shrink-0'>
			<p className='text-sm text-neutral-600 dark:text-neutral-400 font-semibold mb-2'>
				{timeContent}
			</p>
			<p className='text-3xl font-bold text-neutral-900 dark:text-white/90 mb-2'>
				{temperatureContent}°
			</p>
			<p className='text-sm text-center text-neutral-500 dark:text-neutral-300 font-medium'>
				{conditionContent}
			</p>
		</div>
	);
}

export default WeatherCard;
