/**
 * Tipo de dato para la respuesta de la API de autocompletado
 */

export interface LocationType {
	id: number;
	name: string;
	region: string;
	country: string;
	lat: number;
	lon: number;
	url: string;
}
