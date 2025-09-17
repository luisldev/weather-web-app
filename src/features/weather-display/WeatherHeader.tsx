import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import type { LocationType } from '@/types/LocationType';
import { formatHours } from '@/utils/formatters/formatTime';
import { useCallback, useState } from 'react';

interface HeaderProps {
	location: LocationType;
	date: string;
	time: number | null;
}

function WeatherHeader({ location, date, time }: HeaderProps) {
	const [modalIsOpen, setIsModalOpen] = useState(false);

	const openModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	// Comparación del tiempo entre la última búsqueda de una ciudad y el tiempo actual (se aumenta 5 segundos a la marca de tiempo de la ciudad buscada)
	const isCacheData = time ? time + 5000 < Date.now() : false;
	const showInfo = isCacheData;

	return (
		<section
			id='weather_header'
			className='w-full inline-flex flex-row items-center justify-between font-primary'
		>
			<Badge variant='primary'>
				{location
					? `${location.name}, ${location.region}, ${location.country}`
					: 'Ubicación desconocida'}
			</Badge>
			<div className='space-x-2'>
				{showInfo && (
					<Badge onClick={openModal} variant='neutral'>
						Info
					</Badge>
				)}
				<Badge variant='secondary'>{formatHours(date)}</Badge>
			</div>
			{showInfo && (
				<Modal
					isOpen={modalIsOpen}
					onClose={closeModal}
					size='lg'
					title='Información importante'
					showCloseButton={true}
					closeOnBackdrop={true}
					closeOnEscape={true}
				>
					<p className='font-light text-sm px-2'>
						Se usa un sistema de caché para almacenar los datos del clima ya
						buscados por hasta 15 min. Esto es para limitar las lalmadas a las
						APIs
					</p>
				</Modal>
			)}
		</section>
	);
}
export default WeatherHeader;
