import {
	AutocompleteApiResponseSchema,
	type AutocompleteApiResponse,
} from '@/schemas/autocompleteSchema';
import { useEffect, useState } from 'react';

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
				const url = `/api/autocomplete?query=${query}`;

				const response = await fetch(url);

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error);
				}

				const apiData = await response.json();

				const validatedApiData =
					await AutocompleteApiResponseSchema.parseAsync(apiData);

				if (validatedApiData.length === 0) {
					setError(new Error('No se encontraron resultados para tu búsqueda'));
				}

				const uniqueData = validatedApiData.filter(
					(
						city: AutocompleteApiResponse[number],
						index: number,
						self: AutocompleteApiResponse,
					) =>
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
