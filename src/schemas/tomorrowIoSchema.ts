import { z } from 'zod';

/**
 * Esquema para los valores de cada intervalo de tiempo.
 */
const IntervalValuesSchema = z.object({
  cloudCover: z.number(),
  humidity: z.number(),
  precipitationProbability: z.number(),
  rainIntensity: z.number(),
  temperature: z.number(),
  temperatureApparent: z.number(),
  uvIndex: z.number().optional(),
  visibility: z.number(),
  weatherCode: z.number(),
  weatherCodeDay: z.number().optional(),
  weatherCodeFullDay: z.number().optional(),
  weatherCodeNight: z.number().optional(),
  windDirection: z.number(),
  windSpeed: z.number(),
  sunriseTime: z.string().optional(),
  sunsetTime: z.string().optional(),
});

// Esquema para un solo intervalo (current, 1h, 1d).
const IntervalSchema = z.object({
  startTime: z.string(),
  values: IntervalValuesSchema,
});

// Esquema para la línea de tiempo (colección de intervalos).
const TimelineSchema = z.object({
  timestep: z.union([z.literal('current'), z.literal('1h'), z.literal('1d')]),
  endTime: z.string(),
  startTime: z.string(),
  intervals: z.array(IntervalSchema),
});

// Esquema de la respuesta completa de la API.
export const TomorrowIoApiResponseSchema = z.object({
  data: z.object({
    timelines: z.array(TimelineSchema),
  }),
});

// Esquema para el objeto de error de la API.
export const TomorrowIoApiErrorSchema = z.object({
  code: z.number(),
  message: z.string(),
});

// Tipos inferidos de los esquemas, para usarlos en tu código.
export type TomorrowIoApiResponse = z.infer<typeof TomorrowIoApiResponseSchema>;
export type TomorrowIoApiError = z.infer<typeof TomorrowIoApiErrorSchema>;
