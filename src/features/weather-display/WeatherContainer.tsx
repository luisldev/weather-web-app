import ErrorPage from '@/features/weather-display/pages/ErrorPage';
import InitialPage from '@/features/weather-display/pages/InitialPage';
import Loader from '@/features/weather-display/pages/Loader';
import WeatherCurrent from '@/features/weather-display/WeatherCurrent';
import WeatherDaily from '@/features/weather-display/WeatherDaily';
import WeatherHeader from '@/features/weather-display/WeatherHeader';
import WeatherHourly from '@/features/weather-display/WeatherHourly';
import useWeather from '@/hooks/useWeather';
import { useSelectedCity } from '@/stores/useSelectedCity';

function WeatherContainer() {
	const selectedCity = useSelectedCity((state) => state.selectedCity);
	const time = useSelectedCity((state) => state.time);
	const { currentWeather, dailyWeather, hourlyWeather, loading, error } =
		useWeather({
			selectedCity: selectedCity,
			time: time,
		});

	if (!selectedCity) return <InitialPage />;

	if (loading) return <Loader />;

	if (error) return <ErrorPage message={error.message} />;

	if (!currentWeather || !hourlyWeather || !dailyWeather) {
		return <InitialPage />;
	}

	return (
		<section id='weather_container' className='mt-2 grow'>
			<WeatherHeader
				time={time}
				location={selectedCity}
				date={currentWeather.startTime}
			/>
			<WeatherCurrent currentData={currentWeather} />
			<WeatherHourly hourlyData={hourlyWeather} />
			<WeatherDaily dailyData={dailyWeather} />
		</section>
	);
}

export default WeatherContainer;
