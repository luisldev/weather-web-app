import useWeather from '../../hooks/useWeather';
import { useSelectedCity } from '../../stores/useSelectedCity';
import ErrorPage from './pages/ErrorPage';
import InitialPage from './pages/InitialPage';
import Loader from './pages/Loader';
import WeatherCurrent from './WeatherCurrent';
import WeatherDaily from './WeatherDaily';
import WeatherHeader from './WeatherHeader';
import WeatherHourly from './WeatherHourly';

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
