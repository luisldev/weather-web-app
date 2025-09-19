import type { Interval } from '@/types/WeatherTypes';
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

interface WeatherChartProps {
	data: Interval[];
	timeTitle: string;
	graphicTitleForTempAndFeelsLike: string;
}

/**
 * Componente gráfico para visualizar la temperatura y sensación térmica.
 */
function TemperatureChart({
	data,
	timeTitle = 'Tiempo',
	graphicTitleForTempAndFeelsLike = 'Temperatura y Sensación Térmica',
}: WeatherChartProps) {
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

		// Degradado para la temperatura
		const temperatureGradient = ctx.createLinearGradient(0, 0, 0, 300);
		temperatureGradient.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
		temperatureGradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

		// Degradado para la sensación térmica
		const apparentTemperatureGradient = ctx.createLinearGradient(0, 0, 0, 300);
		apparentTemperatureGradient.addColorStop(0, 'rgba(37, 99, 235, 0.4)');
		apparentTemperatureGradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

		const newChart = new Chart(chartRef.current, {
			type: 'line',
			data: {
				labels: data.map((item) => item.startTime),
				datasets: [
					{
						label: 'Temperatura (°C)',
						data: data.map((item) => item.values.temperature),
						borderColor: 'rgb(56, 189, 248)',
						backgroundColor: temperatureGradient,
						tension: 0.3,
						fill: 'origin',
					},
					{
						label: 'Sensación térmica (°C)',
						data: data.map((item) => item.values.temperatureApparent),
						borderColor: 'rgb(37, 99, 235)',
						backgroundColor: apparentTemperatureGradient,
						tension: 0.3,
						fill: 'origin',
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
						text: graphicTitleForTempAndFeelsLike,
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
							text: 'Temperatura (°C)',
						},
						beginAtZero: true,
					},
				},
			},
		});

		return () => {
			newChart.destroy();
		};
	}, [data, timeTitle, graphicTitleForTempAndFeelsLike]);

	return (
		<div style={{ width: '100%', height: '320px' }}>
			<canvas ref={chartRef}></canvas>
		</div>
	);
}
export default TemperatureChart;
