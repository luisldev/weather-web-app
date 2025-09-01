import type { DayHighlight, IntervalValues } from '../../types/WeatherTypes';

export default function getSolarData(
	values: IntervalValues,
): DayHighlight | undefined {
	if (!values.sunriseTime || !values.sunsetTime) {
		return undefined;
	}
	return {
		sunrise: values.sunriseTime,
		sunset: values.sunsetTime,
	};
}
