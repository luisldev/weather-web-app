import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import type { Interval } from '../../../types/WeatherTypes';

interface PrecipitationChartProps {
	data: Interval[];
	timeTitle: string;
	graphicTitleForCloudHumidityAndProbRain: string;
}

/**
 * Componente de gráfico para visualizar la nubosidad, humedad y probabilidad de lluvia.
 *
 * @param {PrecipitationChartProps} { data, timeTitle } - Los datos de pronóstico por intervalos de tiempo.
 */
function PrecipitationChart({
	data,
	timeTitle = 'Tiempo',
	graphicTitleForCloudHumidityAndProbRain = 'Nubosidad, Humedad y Probabilidad de lluvia',
}: PrecipitationChartProps) {
	const chartRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!chartRef.current) {
			return;
		}

		const existingChart = Chart.getChart(chartRef.current);
		if (existingChart) {
			existingChart.destroy();
		}

		const ctx = chartRef.current.getContext('2d');
		if (!ctx) return;

		// Degradado para la nubosidad
		const cloudinessGradient = ctx.createLinearGradient(0, 0, 0, 300);
		cloudinessGradient.addColorStop(0, 'rgba(100, 116, 139, 0.5)');
		cloudinessGradient.addColorStop(1, 'rgba(100, 116, 139, 0)');

		// Degradado para la humedad
		const humidityGradient = ctx.createLinearGradient(0, 0, 0, 300);
		humidityGradient.addColorStop(0, 'rgba(45, 212, 191, 0.5)');
		humidityGradient.addColorStop(1, 'rgba(45, 212, 191, 0)');

		// Degradado para la probabilidad de lluvia
		const rainProbGradient = ctx.createLinearGradient(0, 0, 0, 300);
		rainProbGradient.addColorStop(0, 'rgba(250, 204, 21, 0.5)');
		rainProbGradient.addColorStop(1, 'rgba(250, 204, 21, 0)');

		const newChart = new Chart(chartRef.current, {
			type: 'line',
			data: {
				labels: data.map((d) => d.startTime),
				datasets: [
					{
						label: 'Nubosidad (%)',
						data: data.map((item) => item.values.cloudCover),
						borderColor: 'rgb(100, 116, 139)',
						backgroundColor: cloudinessGradient,
						tension: 0.4,
						fill: true,
					},
					{
						label: 'Humedad (%)',
						data: data.map((item) => item.values.humidity),
						borderColor: 'rgb(45, 212, 191)',
						backgroundColor: humidityGradient,
						tension: 0.4,
						fill: true,
					},
					{
						label: 'Probabilidad de Lluvia (%)',
						data: data.map((item) => item.values.precipitationProbability),
						borderColor: 'rgb(250, 204, 21)',
						backgroundColor: rainProbGradient,
						tension: 0.4,
						fill: true,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: 'top',
					},
					title: {
						display: true,
						text: graphicTitleForCloudHumidityAndProbRain,
					},
				},
				interaction: {
					intersect: false,
				},
				scales: {
					x: {
						title: {
							display: true,
							text: timeTitle,
						},
					},
					y: {
						title: {
							display: true,
							text: 'Porcentaje (%)',
						},
						beginAtZero: true,
					},
				},
			},
		});

		return () => {
			newChart.destroy();
		};
	}, [data, timeTitle, graphicTitleForCloudHumidityAndProbRain]);

	return (
		<div className='w-full'>
			<canvas ref={chartRef}></canvas>
		</div>
	);
}

export default PrecipitationChart;
