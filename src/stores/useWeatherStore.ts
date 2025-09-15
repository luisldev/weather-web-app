import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { TomorrowIoApiResponse } from '../types/WeatherTypes';

type CachedWeather = TomorrowIoApiResponse & {
	id: number;
	lastFetchTimestamp: number;
};

type WeatherStoreState = {
	weatherData: CachedWeather[];
	setWeatherData: (data: TomorrowIoApiResponse, id: number) => void;
};

/**
 * Store para manejar y persistir datos meteorológicos en caché con Zustand
 */

export const useWeatherStore = create<WeatherStoreState>()(
	persist(
		(set, get) => ({
			weatherData: [],
			setWeatherData: (data, id) => {
				const newWeatherData = { ...data, id, lastFetchTimestamp: Date.now() };
				const updatedCache = [
					...get().weatherData.filter((item) => item.id !== id),
					newWeatherData,
				];
				set({ weatherData: updatedCache });
			},
		}),
		{
			name: 'weather-data',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
