// Errores personalizados para la aplicación del clima

export class WeatherError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'WeatherError';
	}
}

export class LocationNotFounding extends WeatherError {
	constructor(
		message: string = 'No encontramos datos para la ubicación solicitada',
	) {
		super(message);
		this.name = 'NonLocationFounding';
	}
}

export class InvalidData extends WeatherError {
	constructor(
		message: string = 'Los datos que devuelve el servidor no son válidos',
	) {
		super(message);
		this.name = 'NonLocationFounding';
	}
}

export class ConnectionError extends WeatherError {
	constructor(
		message: string = 'No pudimos conectarnos al servicio del clima',
	) {
		super(message);
		this.name = 'ErrorConection';
	}
}

export class ApiKeyError extends WeatherError {
	constructor(
		message: string = 'Hay un problema con la configuración del servicio',
	) {
		super(message);
		this.name = 'ApiKeyError';
	}
}

export class TimeoutError extends WeatherError {
	constructor(
		message: string = 'La solicitud tardó demasiado tiempo en responder',
	) {
		super(message);
		this.name = 'TimeoutError';
	}
}

export class RateLimitError extends WeatherError {
	constructor(
		message: string = 'Hemos alcanzado el límite de consultas, intenta más tarde',
	) {
		super(message);
		this.name = 'RateLimitError';
	}
}

export class ServiceUnavailableError extends WeatherError {
	constructor(
		message: string = 'El servicio del clima no está disponible temporalmente',
	) {
		super(message);
		this.name = 'ServiceUnavailableError';
	}
}
