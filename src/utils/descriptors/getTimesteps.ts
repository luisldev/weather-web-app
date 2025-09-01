/**
 * Calcula y devuelve los tiempo de starTime y endTime en formato ISO 8601 para obtener 7 días de pronóstico
 * Devuelve el objeto el siguiente objeto para usarlos directamente en las opciones del fetch
 * @***{ startTime, endTime}***
 */

export function getTimesteps() {
  const now = Date.now();
  let startTimeMiliseconds = new Date(now);
  let startTime = startTimeMiliseconds.toISOString();
  startTime = startTime.slice(0, 19) + 'Z'; // Adjust to UTC format

  let endTimeMiliseconds = new Date(now + 5 * 24 * 60 * 60 * 1000);
  let endTime = endTimeMiliseconds.toISOString();
  endTime = endTime.slice(0, 19) + 'Z'; // Adjust to UTC format
  return { startTime, endTime };
}
