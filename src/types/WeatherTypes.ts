/**
 * Representa los valores climáticos para un intervalo de tiempo específico.
 * Nota: Algunos campos como 'weatherCodeDay' y 'weatherCodeNight' son opcionales
 * porque no están presentes en todos los timesteps (ej. 'current' o '1h').
 */
export interface IntervalValues {
	cloudCover: number;
	humidity: number;
	sunriseTime?: string;
	sunsetTime?: string;
	precipitationProbability: number;
	rainIntensity: number;
	temperature: number;
	temperatureApparent: number;
	uvIndex?: number;
	visibility: number;
	weatherCode: number;
	weatherCodeDay?: number; // Opcional: Solo en timestep '1d'
	weatherCodeFullDay?: number; // Opcional: Solo en timestep '1d'
	weatherCodeNight?: number; // Opcional: Solo en timestep '1d'
	windDirection: number;
	windSpeed: number;
}

/**
 * Representa un intervalo de tiempo con su hora de inicio y los valores climáticos asociados.
 */
export interface Interval {
	id?: string;
	startTime: string; // Formato ISO 8601 (ej. "2025-07-24T06:00:00Z")
	values: IntervalValues;
}

/**
 * Representa una línea de tiempo para un timestep específico (ej. '1d', '1h', 'current').
 */
export interface Timeline {
	timestep: '1d' | '1h' | 'current';
	endTime: string; // Formato ISO 8601
	startTime: string; // Formato ISO 8601
	intervals: Interval[];
}

/**
 * La estructura de la respuesta completa de la API de Tomorrow.io.
 */
export interface TomorrowIoApiResponse {
	data: {
		timelines: Timeline[];
	};
}

/**
 * Representa información astronómica para el día actual
 */
export interface DayHighlight {
	sunrise: string;
	sunset: string;
}

/**
 * Representa la respuesta de la API cuando ocurre un error,
 * incluso si el estado HTTP es 200.
 */
export interface TomorrowIoErrorResponse {
	code: number;
	message: string;
}
