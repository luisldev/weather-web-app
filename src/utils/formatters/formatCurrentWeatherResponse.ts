import type { Interval, Timeline } from '@/types/WeatherTypes';

export default function formatCurrentWeatherResponse(
	timelines: Timeline[],
): Interval | undefined {
	const currentTimeline = timelines.find(
		(timeline) => timeline.timestep === 'current',
	);

	if (!currentTimeline || currentTimeline.intervals.length === 0) {
		return undefined;
	}

	const interval = currentTimeline.intervals[0];

	return {
		id: interval.startTime,
		startTime: interval.startTime,
		values: {
			cloudCover: interval.values.cloudCover,
			humidity: interval.values.humidity,
			precipitationProbability: interval.values.precipitationProbability,
			rainIntensity: interval.values.rainIntensity,
			temperature: interval.values.temperature,
			temperatureApparent: interval.values.temperatureApparent,
			uvIndex: interval.values.uvIndex,
			visibility: interval.values.visibility,
			weatherCode: interval.values.weatherCode,
			windDirection: interval.values.windDirection,
			windSpeed: interval.values.windSpeed,
			sunriseTime: interval.values.sunriseTime,
			sunsetTime: interval.values.sunsetTime,
		},
	};
}
