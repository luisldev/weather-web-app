export function getVisibilityDescription(visibilidad: number): string {
	if (visibilidad < 1) return 'Muy Limitada';
	if (visibilidad < 5) return 'Limitada';
	if (visibilidad < 10) return 'Moderada';
	if (visibilidad < 20) return 'Buena';
	return 'Excelente';
}
