import {
	type AutocompleteApiResponse,
	AutocompleteApiResponseSchema,
} from '@/schemas/autocompleteSchema';
import weatherApiErrors from '@/utils/descriptors/WeatherApiErrors';
import { LocationNotFounding } from '@/utils/errors/errors';
import { useEffect, useState } from 'react';

const AUTOCOMPLETE_API_KEY = import.meta.env.VITE_WEATHERAPI_API_KEY;

/**
 * Hook para manejar la lógica de autocompletado de la API de WeatherAPI.
 * @param query La cadena de búsqueda del usuario.
 * @returns Un objeto con los datos de las sugerencias junto con el estado de carga y error.
 */
export default function useAutocomplete(query: string) {
	const [data, setData] = useState<AutocompleteApiResponse>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		// Si la cadena de búsqueda es muy corta, se limpian los resultados no se hace la llamada.
		if (query.length < 3) {
			setData([]);
			setLoading(false);
			setError(null);
			return;
		}

		const timeoutId = setTimeout(async () => {
			setLoading(true);
			setError(null);

			try {
				const url = `https://api.weatherapi.com/v1/search.json?key=${AUTOCOMPLETE_API_KEY}&q=${query}`;
				const response = await fetch(url);

				if (!response.ok) {
					const mappedError = weatherApiErrors(response.status);
					throw mappedError;
				}

				const rawData: unknown = await response.json();

				// Si la validación es exitosa, los datos son correctos.
				const apiData: AutocompleteApiResponse =
					await AutocompleteApiResponseSchema.parseAsync(rawData);

				if (apiData.length === 0) {
					setError(
						new LocationNotFounding(
							'No se encontraron resultados para tu búsqueda',
						),
					);
				}

				// Desduplicación de datos, evita que se muestren ciudades con lalitud y longitud idénticas
				const uniqueData = apiData.filter(
					(city, index, self) =>
						index ===
						self.findIndex((c) => c.lat === city.lat && c.lon === city.lon),
				);

				setData(uniqueData);
			} catch (err) {
				setData([]);
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [query]);

	return { data, loading, error };
}
