import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

/**
 * Función Serverless para obtener sugerencias de autocompletado
 */

export default async function (req: VercelRequest, res: VercelResponse) {
	const apiKey = process.env.WEATHER_API_KEY;
	const { query } = req.query;

	if (!apiKey) {
		return res
			.status(500)
			.json({ error: 'Error de configuración del servidor.' });
	}
	if (!query || typeof query !== 'string' || query.length < 3) {
		return res.status(400).json({ error: 'Búsqueda inválida.' });
	}

	try {
		const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;

		const response = await fetch(url);

		if (!response.ok) {
			return res.status(response.status).json({
				error: 'No se pudieron obtener sugerencias de esta ubicación.',
			});
		}

		const data = await response.json();

		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al procesar la petición:', error);
		return res.status(500).json({
			error:
				'Error interno del servidor. Por favor, inténtelo de nuevo más tarde.',
		});
	}
}
