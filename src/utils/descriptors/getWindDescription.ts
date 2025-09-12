export function getWindDescription(velocidad: number): string {
	if (velocidad < 1) return 'Calma';
	if (velocidad < 6) return 'Brisa Ligera';
	if (velocidad < 12) return 'Brisa Suave';
	if (velocidad < 20) return 'Brisa Moderada';
	if (velocidad < 29) return 'Brisa Fresca';
	if (velocidad < 39) return 'Brisa Fuerte';
	return 'Viento Fuerte';
}
