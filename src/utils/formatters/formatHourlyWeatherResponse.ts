import type { Interval, Timeline } from '../../types/WeatherTypes';
import { formatHours } from './formatTime';

export default function formatHourlyWeatherResponse(
	response: Timeline[],
): Interval[] {
	const hourlyTimeline = response.find(
		(timeline) => timeline.timestep === '1h',
	);

	if (!hourlyTimeline || hourlyTimeline.intervals.length === 0) {
		return [];
	}

	return hourlyTimeline.intervals.slice(0, 25).map((hour) => ({
		id: crypto.randomUUID(),
		startTime: formatHours(hour.startTime),
		values: {
			cloudCover: hour.values.cloudCover,
			humidity: hour.values.humidity,
			precipitationProbability: hour.values.precipitationProbability,
			rainIntensity: hour.values.rainIntensity,
			temperature: hour.values.temperature,
			temperatureApparent: hour.values.temperatureApparent,
			uvIndex: hour.values.uvIndex,
			visibility: hour.values.visibility,
			weatherCode: hour.values.weatherCode,
			windDirection: hour.values.windDirection,
			windSpeed: hour.values.windSpeed,
		},
	}));
}
