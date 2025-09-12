import { create } from 'zustand';
import type { LocationType } from '../types/LocationType';

type SelectedCityState = {
	time: number | null;
	selectedCity: LocationType | null;
	setSelectedCity: (city: LocationType, time: number) => void;
};

export const useSelectedCity = create<SelectedCityState>((set) => ({
	selectedCity: null,
	time: null,
	setSelectedCity: (city, time) => set({ selectedCity: city, time: time }),
}));
