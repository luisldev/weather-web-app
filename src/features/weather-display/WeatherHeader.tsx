import Badge from '../../components/ui/Badge';
import type { LocationType } from '../../types/LocationType';
import { formatHours } from '../../utils/formatters/formatTime';

function WeatherHeader({
	location,
	date,
}: {
	location: LocationType;
	date: string;
}) {
	return (
		<section
			id='weather_header'
			className='w-full inline-flex flex-row items-center justify-between'
		>
			<Badge variant='primary'>
				{location
					? `${location.name}, ${location.region}, ${location.country}`
					: 'Ubicación desconocida'}
			</Badge>
			<Badge variant='secondary'>{formatHours(date)}</Badge>
		</section>
	);
}
export default WeatherHeader;
