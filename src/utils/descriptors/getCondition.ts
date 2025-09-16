import { WEATHER_CODES_MAP } from '@/utils/descriptors/WEATHER_CODES_MAP';

export function getCondition(
	code: number,
	codeType: keyof typeof WEATHER_CODES_MAP,
): string {
	const codeStr = String(code);
	const map = WEATHER_CODES_MAP[codeType];
	return map
		? map[codeStr] || 'Condición desconocida'
		: 'Tipo de código desconocido';
}
