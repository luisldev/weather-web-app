import Badge from '@/components/ui/Badge';
import { useHistoryStore } from '@/stores/useHistoryStore';
import type { LocationType } from '@/types/LocationType';
import type { WeatherError } from '@/utils/errors/errors';

type Props = {
	data: LocationType[];
	loading: boolean;
	error: WeatherError | Error | null;
	onSelect?: (city: LocationType) => void;
	historyData: LocationType[];
};

function Autocomplete({ data, loading, error, onSelect, historyData }: Props) {
	const { removeAllHistory } = useHistoryStore();
	if (loading) {
		return (
			<div className='flex justify-center mt-4 py-4 font-primary'>
				<Badge variant='warning'>Cargando...</Badge>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex justify-center mt-4 py-4 font-primary'>
				<Badge variant='danger'>{error.message}</Badge>
			</div>
		);
	}

	function handleSelect(city: LocationType) {
		onSelect?.(city);
	}

	const hasHistoryData = historyData.length > 0;
	const hasAutocompleteData = data.length > 0;

	if (!hasHistoryData && !hasAutocompleteData) {
		return (
			<div className='flex justify-center mt-4 py-4'>
				<Badge className='font-primary' variant='neutral'>
					Prueba buscar alguna ciudad para obtener autocompletado.
				</Badge>
			</div>
		);
	}

	return (
		<div className='bg-neutral-100 dark:bg-neutral-800 rounded-lg my-2 shadow-sm p-4 flex flex-col gap-y-4'>
			{hasHistoryData && (
				<>
					<div className='flex justify-between items-center px-1'>
						<h2 className='text-xs font-semibold opacity-65 font-primary'>
							Recientes
						</h2>
						<button
							type='button'
							onClick={removeAllHistory}
							className='text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-150 ease-in font-primary'
						>
							Limpiar historial
						</button>
					</div>
					<ul className='flex flex-col gap-y-1.5'>
						{historyData.map((city) => (
							<li key={city.id}>
								<button
									type='button'
									onClick={() => handleSelect(city)}
									className='w-full text-left text-sm px-2 py-1 rounded-md flex items-center justify-between gap-x-2 font-light opacity-90 hover:opacity-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors duration-150 ease-in group font-secondary'
								>
									<span className='inline-flex flex-col'>
										<span className='font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-blue-500 group-focus-within:text-blue-500 transition-colors duration-100'>
											{city.name}
										</span>
										<span className='text-xs opacity-70'>
											{`${city.region}, ${city.country}`}
										</span>
									</span>
									<span className='text-xs opacity-60 min-w-fit'>
										{`${city.lat}, ${city.lon}`}
									</span>
								</button>
							</li>
						))}
					</ul>
				</>
			)}

			{hasHistoryData && hasAutocompleteData && (
				<hr className='border-neutral-300 dark:border-neutral-700' />
			)}

			{hasAutocompleteData && (
				<>
					<h2 className='text-xs font-semibold opacity-65 px-1'>
						Sugerencias basadas en tu búsqueda
					</h2>
					<ul className='flex flex-col gap-y-1.5'>
						{data.map((city) => (
							<li key={city.id}>
								<button
									type='button'
									onClick={() => handleSelect(city)}
									className='w-full text-left text-sm px-2 py-1 rounded-md flex items-center justify-between gap-x-2 font-light opacity-90 hover:opacity-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors duration-150 ease-in group'
								>
									<span className='inline-flex flex-col'>
										<span className='font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-blue-500 group-focus-within:text-blue-500 transition-colors duration-100'>
											{city.name}
										</span>
										<span className='text-xs opacity-70'>
											{city.region}, {city.country}
										</span>
									</span>
									<span className='text-xs opacity-60 min-w-fit'>
										{city.lat}, {city.lon}
									</span>
								</button>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}

export default Autocomplete;
