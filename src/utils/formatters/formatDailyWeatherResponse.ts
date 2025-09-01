import type { Timeline, Interval } from '@/types/WeatherTypes';
import { formatDay } from '@/helpers/formatTime';

export default function formatDailyWeatherResponse(
  response: Timeline[]
): Interval[] {
  const dailyTimeline = response.find((timeline) => timeline.timestep === '1d');

  if (!dailyTimeline || dailyTimeline.intervals.length === 0) {
    return [];
  }

  return dailyTimeline.intervals.map((day) => ({
    id: crypto.randomUUID(),
    startTime: formatDay(day.startTime),
    values: {
      cloudCover: day.values.cloudCover,
      humidity: day.values.humidity,
      precipitationProbability: day.values.precipitationProbability,
      rainIntensity: day.values.rainIntensity,
      temperature: day.values.temperature,
      temperatureApparent: day.values.temperatureApparent,
      uvIndex: day.values.uvIndex,
      visibility: day.values.visibility,
      weatherCode: day.values.weatherCode,
      weatherCodeFullDay: day.values.weatherCodeFullDay,
      windDirection: day.values.windDirection,
      windSpeed: day.values.windSpeed,
      sunriseTime: day.values.sunriseTime,
      sunsetTime: day.values.sunsetTime,
    },
  }));
}
