import WeatherCard from '@/features/weather-display/WeatherCard';
import WeatherCardContainer from '@/features/weather-display/WeatherCardContainer';
import type { Interval } from '@/types/WeatherTypes';

type WeatherHourlyProps = {
	hourlyData: Interval[];
};

function WeatherHourly({ hourlyData }: WeatherHourlyProps) {
	return (
		<WeatherCardContainer
			id='weather_hourly'
			title='Pronóstico por horas'
			data={hourlyData}
			timeTitle='Horas'
			graphicTitleForCloudHumidityAndProbRain='Nubosidad, Humedad y Probabilidad de lluvias para las próximas 24 horas'
			graphicTitleForTempAndFeelsLike='Temperatura y Sensación Térmica para las próximas 24 horas'
		>
			{hourlyData.map((hour) => (
				<WeatherCard key={hour.id} data={hour} type='hourly' />
			))}
		</WeatherCardContainer>
	);
}

export default WeatherHourly;
