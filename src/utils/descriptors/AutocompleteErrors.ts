import {
	ApiKeyError,
	ConnectionError,
	LocationNotFounding,
	RateLimitError,
	ServiceUnavailableError,
} from '@/utils/errors/errors';
/**
 * Mapea los códigos de estado HTTP a errores personalizados
 */
const autocompleteApiErrors = (statusCode: number): Error => {
	switch (statusCode) {
		case 400: // Bad Request
			return new LocationNotFounding(
				'Búsqueda inválida. No se encontraron resultados.',
			);
		case 401: // Unauthorized
			return new ApiKeyError('La clave de la API no es válida.');
		case 403: // Forbidden
			return new RateLimitError('Límite de consultas alcanzado.');
		case 500: // Internal Server Error
		case 502: // Bad Gateway
		case 503: // Service Unavailable
		case 504: // Gateway Timeout
			return new ServiceUnavailableError(
				'El servicio de autocompletado no está disponible.',
			);
		default:
			return new ConnectionError(
				'Ocurrió un error inesperado al conectar con la API.',
			);
	}
};

export default autocompleteApiErrors;
