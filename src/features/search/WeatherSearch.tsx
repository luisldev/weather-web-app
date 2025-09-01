import { useState } from 'react';
import useAutocomplete from '../../hooks/useAutocomplete';
import { useHistoryStore } from '../../stores/useHistoryStore';
import { useSelectedCity } from '../../stores/useSelectedCity';
import type { LocationType } from '../../types/LocationType';
import Autocomplete from '../autocomplete/Autocomplete';

interface Props {
	closeModal: () => void;
}

function WeatherSearch({ closeModal }: Props) {
	const [query, setQuery] = useState('');
	const { data, loading, error } = useAutocomplete(query);
	const { history, addHistory } = useHistoryStore();
	const { setSelectedCity } = useSelectedCity();

	function handleQueryInput(e: React.ChangeEvent<HTMLInputElement>) {
		const currentValue = e.currentTarget.value;
		const regex: RegExp = /^[A-Za-zÀ-ÿ\s]*$/;

		if (!currentValue || !regex.test(currentValue)) {
			setQuery('');
			return;
		}
		setQuery(currentValue);
	}

	function handleSelect(city: LocationType) {
		addHistory(city);
		setSelectedCity(city);
		setQuery('');
		closeModal();
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// Solo si hay datos de autocompletado, procedemos.
		if (data.length > 0) {
			handleSelect(data[0]);
		} else {
			// Si no hay datos, no hacemos nada.
			// Puedes mostrar un mensaje al usuario aquí, si lo deseas.
		}
	}

	return (
		<div className='dark:bg-neutral-900 rounded-lg'>
			<search>
				<form
					onSubmit={handleSubmit}
					name='weatherSearch'
					className='px-4 flex flex-col w-full'
				>
					<div className='relative group w-full'>
						<div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
							<svg
								className='h-4 w-4 text-neutral-400 group-hover:text-blue-500 group-focus-within:text-blue-500 transition-colors duration-100'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								></path>
							</svg>
						</div>
						<input
							className='p-2 shadow-sm outline-none ps-10 pe-4 block w-full rounded-lg sm:text-sm border-2 border-transparent focus:border-blue-500 bg-neutral-100 placeholder:text-neutral-400 dark:bg-neutral-800 dark:text-neutral-400 dark:placeholder-neutral-500'
							type='text'
							name='weatherSearch'
							id='weatherSearch'
							placeholder='New York, London, Tokio'
							value={query}
							onChange={handleQueryInput}
							autoComplete='off'
						/>
					</div>
					<Autocomplete
						data={data}
						loading={loading}
						error={error}
						onSelect={handleSelect}
						historyData={history}
					/>
				</form>
			</search>
		</div>
	);
}

export default WeatherSearch;
