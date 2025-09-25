import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

/**
 * Función Serverless para obtener y validar los datos del clima.
 */
export default async function (req: VercelRequest, res: VercelResponse) {
	const apiKey = process.env.TOMORROW_IO_API_KEY;

	if (!apiKey) {
		return res.status(500).json({ error: 'Error de configuración.' });
	}

	const lat = Number(req.query.lat);
	const lon = Number(req.query.lon);
	const fields = String(req.query.fields);

	if (Number.isNaN(lat) || Number.isNaN(lon)) {
		return res.status(400).json({ error: 'Ubicación no válida.' });
	}

	try {
		const url = `https://api.tomorrow.io/v4/timelines?location=${lat},${lon}&fields=${fields}&timesteps=current,1h,1d&units=metric&apikey=${apiKey}`;
		const response = await fetch(url);

		if (!response.ok) {
			try {
				const errorData = await response.json();
				console.error('Error de la API:', errorData);
				return res.status(response.status).json({
					error: 'No se pudieron obtener los datos del clima.',
				});
			} catch (e) {
				return res.status(response.status).json({
					error: 'Error de la API externa sin un mensaje específico.',
				});
			}
		}

		const data = await response.json();

		return res.status(200).json(data);
	} catch (err) {
		return res.status(500).json({
			error: 'Error interno del servidor al obtener los datos del clima.',
		});
	}
}
