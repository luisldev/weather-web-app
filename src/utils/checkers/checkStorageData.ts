import { useWeatherStore } from '../../stores/useWeatherStore';

/**
 * Verifica si hay datos del clima válidos en la caché persistente.
 * @returns {boolean} `true` si el store tiene datos del clima, `false` de lo contrario.
 */
export function checkStorageData(): boolean {
	// Obtenemos el valor actual del store persistente.
	const { weatherData } = useWeatherStore.getState();

	// Verificamos si los datos no son `undefined` o `null`.
	return !!weatherData;
}
