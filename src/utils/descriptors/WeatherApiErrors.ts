import {
	ApiKeyError,
	ConnectionError,
	LocationNotFounding,
	RateLimitError,
	ServiceUnavailableError,
	TimeoutError,
} from '@/utils/errors/errors';

export default function weatherApiErrors(status: number): Error {
	switch (status) {
		case 400:
			return new LocationNotFounding('La ubicación especificada no es válida');
		case 401:
			return new ApiKeyError();
		case 403:
			return new ApiKeyError('No tienes permisos para acceder a este servicio');
		case 404:
			return new LocationNotFounding();
		case 429:
			return new RateLimitError();
		case 500:
		case 502:
		case 503:
			return new ServiceUnavailableError();
		case 504:
			return new TimeoutError('El servicio del clima no respondió a tiempo');
		default:
			return new ConnectionError();
	}
}
