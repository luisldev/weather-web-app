import WeatherCurrentItems from '@/features/weather-display/WeatherCurrentItems';
import type { Interval } from '@/types/WeatherTypes';
import { getCondition } from '@/utils/descriptors/getCondition';
import { getHumidityDescription } from '@/utils/descriptors/getHumidityDescription';
import { getUVIndex } from '@/utils/descriptors/getUVIndex';
import { getVisibilityDescription } from '@/utils/descriptors/getVisibilityDescription';
import { getWindDescription } from '@/utils/descriptors/getWindDescription';
import { formatHours } from '@/utils/formatters/formatTime';

interface WeatherCurrentProps {
	currentData: Interval;
}

function WeatherCurrent({ currentData }: WeatherCurrentProps) {
	const {
		temperature,
		temperatureApparent,
		weatherCode,
		humidity,
		windSpeed,
		uvIndex,
		visibility,
		cloudCover,
		precipitationProbability,
		sunriseTime,
		sunsetTime,
	} = currentData.values;

	return (
		<section
			id='weather_current'
			className='bg-neutral-50 dark:bg-neutral-900 rounded-xl px-4 pt-0 pb-4 shadow-md'
		>
			<header className='w-full text-center my-8'>
				<h2 className='text-5xl font-bold font-primary'>{temperature || '-'}°</h2>
				<p className='text-md font-medium mt-1 font-secondary'>
					{getCondition(weatherCode, 'weatherCode')}
				</p>
				<p className='opacity-70 text-sm mt-1 font-secondary'>
					Sensación térmica: {temperatureApparent || '-'}°
				</p>
			</header>
			{sunriseTime && sunsetTime && (
				<div className='grid grid-cols-1 md:grid-cols-2 gap-2 font-secondary'>
					<div className='flex flex-row lg:flex-col items-start justify-between p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800'>
						<p className='text-sm opacity-60'>Amanecer</p>
						<div className='inline-flex items-center gap-1'>
							<p className='font-bold text-sm'>{formatHours(sunriseTime)}</p>
						</div>
					</div>

					<div className='flex flex-row lg:flex-col items-start justify-between p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800'>
						<p className='text-sm opacity-60'>Anochecer</p>
						<div className='inline-flex items-center gap-1'>
							<p className='font-bold text-sm'>{formatHours(sunsetTime)}</p>
						</div>
					</div>
				</div>
			)}
			<div className='mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 font-secondary'>
				<WeatherCurrentItems
					title='Humedad'
					value={humidity}
					description={getHumidityDescription(humidity)}
					units='%'
				/>
				<WeatherCurrentItems
					title='Viento'
					value={windSpeed}
					units='km/h'
					description={getWindDescription(windSpeed)}
				/>
				<WeatherCurrentItems title='Nubosidad' value={cloudCover} units='%' />
				<WeatherCurrentItems
					title='Probabilidad de lluvia'
					value={precipitationProbability}
					units='%'
				/>
				{!!uvIndex && (
					<WeatherCurrentItems
						title='Índice UV'
						value={uvIndex}
						description={getUVIndex(uvIndex)}
					/>
				)}
				<WeatherCurrentItems
					title='Visibilidad'
					value={visibility}
					units='km'
					description={getVisibilityDescription(visibility)}
				/>
			</div>
		</section>
	);
}
export default WeatherCurrent;
