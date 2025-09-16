import WeatherCard from '@/features/weather-display/WeatherCard';
import WeatherCardContainer from '@/features/weather-display/WeatherCardContainer';
import type { Interval } from '@/types/WeatherTypes';

interface WeatherDailyProps {
	dailyData: Interval[];
}

function WeatherDaily({ dailyData }: WeatherDailyProps) {
	return (
		<WeatherCardContainer
			id='weather_daily'
			title='Pronóstico por días'
			data={dailyData}
			timeTitle='Días'
			graphicTitleForTempAndFeelsLike='Temperatura y Sensación Térmica para los próximos 5 días'
			graphicTitleForCloudHumidityAndProbRain='Nubosidad, Humedad y Probabilidad de lluvias para los próximos 5 días'
		>
			{dailyData.map((day) => (
				<WeatherCard key={day.id} data={day} type='daily' />
			))}
		</WeatherCardContainer>
	);
}

export default WeatherDaily;
