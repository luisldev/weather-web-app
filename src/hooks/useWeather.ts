import fetchWeather from '@/api/fetchWeather';
import { useWeatherStore } from '@/stores/useWeatherStore';
import type { LocationType } from '@/types/LocationType';
import type { Interval, TomorrowIoApiResponse } from '@/types/WeatherTypes';
import { LocationNotFounding } from '@/utils/errors/errors';
import formatCurrentWeatherResponse from '@/utils/formatters/formatCurrentWeatherResponse';
import formatDailyWeatherResponse from '@/utils/formatters/formatDailyWeatherResponse';
import formatHourlyWeatherResponse from '@/utils/formatters/formatHourlyWeatherResponse';
import { useEffect, useState } from 'react';

// Duración de la caché en milisegundos (15 minutos)
const CACHE_EXPIRATION_MS = 15 * 60 * 1000;

interface CustomHookProps {
	selectedCity: LocationType | null;
	time: number | null;
}

export default function useWeather({ selectedCity, time }: CustomHookProps) {
	const [currentWeather, setCurrentWeather] = useState<Interval | undefined>(
		undefined,
	);
	const [dailyWeather, setDailyWeather] = useState<Interval[] | undefined>(
		undefined,
	);
	const [hourlyWeather, setHourlyWeather] = useState<Interval[] | undefined>(
		undefined,
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	//Gestión de información relacionada con el uso de datos en caché
	const [timeInfo, setTimeInfo] = useState<string | null>(null);

	const weatherData = useWeatherStore((state) => state.weatherData);
	const setWeatherData = useWeatherStore((state) => state.setWeatherData);

	useEffect(() => {
		async function loadWeatherData() {
			if (!selectedCity || !time) {
				setLoading(false);
				setError(null);
				setCurrentWeather(undefined);
				setDailyWeather(undefined);
				setHourlyWeather(undefined);
				return;
			}
			setLoading(true);
			setError(null);
			setTimeInfo(null);

			const cachedData = weatherData.find(
				(item) => item.id === selectedCity.id,
			);

			if (!selectedCity.lat || !selectedCity.lon) {
				setError(
					new LocationNotFounding(
						'La ciudad seleccionada no tiene coordenadas válidas',
					),
				);
				setLoading(false);
				return;
			}
			const isCacheExpired =
				cachedData &&
				Date.now() - cachedData.lastFetchTimestamp > CACHE_EXPIRATION_MS;

			let apiResponse: TomorrowIoApiResponse | undefined;
			if (cachedData && !isCacheExpired) {
				apiResponse = cachedData;
				setTimeInfo(
					'Debido a que se utiliza planes gratuitos para mostrar información del clima, se usa un sistema de caché para retener la información de las ciudades ya buscadas por hasta 15 minutos. Esto es para optimizar las llamadas a las APIs',
				);
			} else {
				try {
					apiResponse = await fetchWeather({
						lat: selectedCity.lat,
						lon: selectedCity.lon,
					});
					setWeatherData(apiResponse, selectedCity.id);
				} catch (err) {
					setError(err as Error);
				} finally {
					setLoading(false);
				}
			}

			if (apiResponse) {
				const timelines = apiResponse.data.timelines;
				setCurrentWeather(formatCurrentWeatherResponse(timelines));
				setDailyWeather(formatDailyWeatherResponse(timelines));
				setHourlyWeather(formatHourlyWeatherResponse(timelines));
			}
			setLoading(false);
		}

		loadWeatherData();
	}, [selectedCity, time]);

	return {
		currentWeather,
		hourlyWeather,
		dailyWeather,
		loading,
		error,
		timeInfo,
	};
}
