import type { TomorrowIoApiResponse } from '@/schemas/tomorrowIoSchema';
import {
	TomorrowIoApiErrorSchema,
	TomorrowIoApiResponseSchema,
} from '@/schemas/tomorrowIoSchema';
import tomorrowIoErrors from '@/utils/descriptors/TomorrowIoErrors';
import { weatherFields } from '@/utils/descriptors/WeatherFields';
import { ConnectionError, WeatherError } from '@/utils/errors/errors';

const API_KEY = import.meta.env.VITE_TOMORROW_WEATHER_API_KEY;

export default async function fetchWeather({
	lat,
	lon,
}: {
	lat: number;
	lon: number;
}): Promise<TomorrowIoApiResponse> {
	const URL = `https://api.tomorrow.io/v4/timelines?location=${lat},${lon}&fields=${weatherFields.join(
		',',
	)}&timesteps=current,1h,1d&units=metric&apikey=${API_KEY}`;
	try {
		const response = await fetch(URL);

		if (!response.ok) {
			throw tomorrowIoErrors(response.status);
		}

		const rawData: unknown = await response.json();

		const errorResult = TomorrowIoApiErrorSchema.safeParse(rawData);
		if (errorResult.success) {
			throw new WeatherError(errorResult.data.message);
		}

		const result = TomorrowIoApiResponseSchema.safeParse(rawData);
		if (!result.success) {
			throw new WeatherError(`Invalid API response: ${result.error.message}`);
		}

		return result.data;
	} catch (err) {
		if (err instanceof Error) {
			throw err;
		}
		throw new ConnectionError();
	}
}
