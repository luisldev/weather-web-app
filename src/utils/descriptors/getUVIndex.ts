export function getUVIndex(uvIndex: number): string {
	if (uvIndex <= 2) return 'Bajo';
	if (uvIndex <= 5) return 'Moderado';
	if (uvIndex <= 7) return 'Alto';
	if (uvIndex <= 10) return 'Muy Alto';
	return 'Extremo';
}
