import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import WeatherSearch from './WeatherSearch';

function WeatherSearchContainer() {
	const [modalIsOpen, setIsModalOpen] = useState(false);

	function openModal() {
		setIsModalOpen(true);
	}

	function closeModal() {
		setIsModalOpen(false);
	}

	return (
		<>
			<div className='grow'>
				<search>
					<form id='weather-search' className='flex items-center justify-end'>
						<div className='relative group'>
							<div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
								<svg
									className='h-4 w-4 text-neutral-400 group-hover:text-blue-500 group-focus-within:text-blue-500 transition-colors duration-0'
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
								className='w-full py-1 md:py-2 outline-none ps-8 pe-4 block rounded-lg sm:text-sm bg-neutral-100 placeholder:text-neutral-400 dark:bg-neutral-800 dark:text-neutral-400 dark:placeholder-neutral-500'
								type='text'
								name='weather-modal'
								id='weather-modal'
								placeholder='New York, London, Tokio...'
								readOnly
								onClick={openModal}
							/>
						</div>
					</form>
				</search>
			</div>

			<Modal
				title='Buscar ciudad'
				isOpen={modalIsOpen}
				onClose={closeModal}
				size='lg'
				showCloseButton={true}
				closeOnBackdrop={true}
				closeOnEscape={true}
			>
				<WeatherSearch closeModal={closeModal} />
			</Modal>
		</>
	);
}

export default WeatherSearchContainer;
