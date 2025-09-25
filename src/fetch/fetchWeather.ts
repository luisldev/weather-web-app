import {
	TomorrowIoApiResponseSchema,
	type TomorrowIoApiResponse,
} from '@/schemas/tomorrowIoSchema';
import { weatherFields } from '@/utils/descriptors/WeatherFields';
import { ConnectionError } from '@/utils/errors/errors';

export default async function fetchWeather({
	lat,
	lon,
}: {
	lat: number;
	lon: number;
}): Promise<TomorrowIoApiResponse> {
	const URL = `/api/weather?lat=${lat}&lon=${lon}&fields=${weatherFields.join(
		',',
	)}`;
	try {
		const response = await fetch(URL);

		if (!response.ok) {
			const errorData = await response.json();
			throw new ConnectionError(
				errorData.error || 'Error al obtener datos del clima desde el servidor',
			);
		}

		const data: TomorrowIoApiResponse = await response.json();
		const validatedData = await TomorrowIoApiResponseSchema.parseAsync(data);
		return validatedData;
	} catch (err) {
		if (err instanceof Error) {
			throw err;
		}
		throw new ConnectionError();
	}
}
