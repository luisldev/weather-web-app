import { useEffect, useState } from 'react';
import fetchWeather from '../api/fetchWeather';
import { useLastFetchStore } from '../stores/useLastFetch';
import { useWeatherStore } from '../stores/useWeatherStore';
import type { Interval, TomorrowIoApiResponse } from '../types/WeatherTypes';
import formatCurrentWeatherResponse from '../utils/formatters/formatCurrentWeatherResponse';
import formatDailyWeatherResponse from '../utils/formatters/formatDailyWeatherResponse';
import formatHourlyWeatherResponse from '../utils/formatters/formatHourlyWeatherResponse';

// Duración de la caché en milisegundos (15 minutos)
const CACHE_EXPIRATION_MS = 15 * 60 * 1000;

/**
 * Custom hook para obtener y manejar datos del clima desde la API de Tomorrow.io.
 * Incluye manejo de caché, estados de carga y error.
 * @param lat Latitud de la ubicación.
 * @param lon Longitud de la ubicación.
 * @returns Objeto con datos del clima actual, diario y horario, además de estados de carga y error.
 */

interface WeatherProps {
	lat: number | undefined;
	lon: number | undefined;
}

export default function useWeather({ lat, lon }: WeatherProps) {
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

	const { weatherData } = useWeatherStore();
	const { lastFetchTimestamp } = useLastFetchStore();
	const setWeatherData = useWeatherStore((state) => state.setWeatherData);
	const setLastFetchTimestamp = useLastFetchStore(
		(state) => state.setLastFetchTimestamp,
	);

	useEffect(() => {
		if (lat === undefined || lon === undefined) {
			return;
		}
		const loadWeatherData = async () => {
			setLoading(true);
			setError(null);

			const isCacheExpired =
				Date.now() - lastFetchTimestamp > CACHE_EXPIRATION_MS;
			let apiResponse: TomorrowIoApiResponse | undefined;

			if (weatherData && !isCacheExpired) {
				apiResponse = weatherData;
			} else {
				try {
					apiResponse = await fetchWeather({ lat, lon });

					setWeatherData(apiResponse);
					setLastFetchTimestamp(Date.now());
				} catch (err) {
					setError(err as Error);
					setLoading(false);
					return;
				}
			}

			if (apiResponse) {
				const timelines = apiResponse.data.timelines;
				setCurrentWeather(formatCurrentWeatherResponse(timelines));
				setDailyWeather(formatDailyWeatherResponse(timelines));
				setHourlyWeather(formatHourlyWeatherResponse(timelines));
			}

			setLoading(false);
		};

		loadWeatherData();
	}, [lat, lon, lastFetchTimestamp, weatherData]);

	return {
		currentWeather,
		hourlyWeather,
		dailyWeather,
		loading,
		error,
	};
}
