import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { TomorrowIoApiResponse } from '../types/WeatherTypes';

type WeatherStoreState = {
	weatherData: TomorrowIoApiResponse | undefined;
	setWeatherData: (data: TomorrowIoApiResponse | undefined) => void;
};

export const useWeatherStore = create<WeatherStoreState>()(
	persist(
		(set) => ({
			weatherData: undefined,
			setWeatherData: (data) => set({ weatherData: data }),
		}),
		{
			name: 'weather-data',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
