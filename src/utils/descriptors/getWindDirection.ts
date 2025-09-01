export function getWindDirection(grados: number): string {
  const direcciones = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSO',
    'SO',
    'OSO',
    'O',
    'ONO',
    'NO',
    'NNO',
  ];
  const index = Math.round(grados / 22.5) % 16;
  return direcciones[index];
}
