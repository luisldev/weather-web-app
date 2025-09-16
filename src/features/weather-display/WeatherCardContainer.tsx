import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import PrecipitationChart from '@/features/weather-display/charts/PrecipitationChart';
import TemperatureChart from '@/features/weather-display/charts/TemperatureChart';
import type { Interval } from '@/types/WeatherTypes';
import type React from 'react';
import { useState } from 'react';

interface WeatherCardContainerProps {
	title: string;
	children: React.ReactNode;
	id: string;
	data: Interval[];
	timeTitle: string;
	graphicTitleForTempAndFeelsLike: string;
	graphicTitleForCloudHumidityAndProbRain: string;
}

function WeatherCardContainer({
	title,
	children,
	data,
	timeTitle,
	graphicTitleForCloudHumidityAndProbRain,
	graphicTitleForTempAndFeelsLike,
	...props
}: WeatherCardContainerProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	function openModal() {
		setIsModalOpen(true);
	}
	function closeModal() {
		setIsModalOpen(false);
	}

	return (
		<section
			{...props}
			className='bg-neutral-50 dark:bg-neutral-900 rounded-xl px-4 py-2 shadow-md w-full h-full overflow-x-auto'
		>
			<div className='flex flex-row items-center justify-between'>
				<h3 className='text-lg font-semibold mb-2'>{title}</h3>
				<Button
					variant='primary'
					icon={<ChevronRightIcon className='size-4' />}
					iconPosition='right'
					onClick={openModal}
				>
					<span>Ver más</span>
				</Button>
			</div>
			<div className='w-full flex flex-row gap-x-4 overflow-x-auto p-4 scrollbar scrollbar-thumb-rounded-full scrollbar-track-transparent scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600'>
				{children}
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				title={title}
				size='xl'
				showCloseButton
				closeOnBackdrop
				closeOnEscape
			>
				<div className='p-4'>
					<TemperatureChart
						data={data}
						timeTitle={timeTitle}
						graphicTitleForTempAndFeelsLike={graphicTitleForTempAndFeelsLike}
					/>
					<PrecipitationChart
						data={data}
						timeTitle={timeTitle}
						graphicTitleForCloudHumidityAndProbRain={
							graphicTitleForCloudHumidityAndProbRain
						}
					/>
				</div>
			</Modal>
		</section>
	);
}

export default WeatherCardContainer;
