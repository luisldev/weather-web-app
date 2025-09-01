import { z } from 'zod';

// Esquema para un solo resultado de autocompletado (una ciudad).
export const AutocompleteResultSchema = z.object({
  id: z.number(),
  name: z.string(),
  region: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
});

// Esquema para la respuesta completa de la API, que es un array de resultados.
export const AutocompleteApiResponseSchema = z.array(AutocompleteResultSchema);

// Tipo inferido para su uso en el código.
export type AutocompleteApiResponse = z.infer<
  typeof AutocompleteApiResponseSchema
>;
