export function getHumidityDescription(humedad: number): string {
	if (humedad < 30) return 'Seco';
	if (humedad < 60) return 'Cómodo';
	if (humedad < 80) return 'Húmedo';
	return 'Muy Húmedo';
}
