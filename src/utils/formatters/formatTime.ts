export function formatDay(time: string) {
	const date = new Date(time);
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'short',
	};
	return date.toLocaleDateString([], options);
}

export function formatHours(time: string) {
	const date = new Date(time);
	const options: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	};
	return date.toLocaleTimeString([], options);
}
