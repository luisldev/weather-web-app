import { create } from 'zustand';
import type { LocationType } from '../types/LocationType';

type SelectedCityState = {
	selectedCity: LocationType | null;
	setSelectedCity: (city: LocationType) => void;
};

export const useSelectedCity = create<SelectedCityState>((set) => ({
	selectedCity: null,
	setSelectedCity: (city) => set({ selectedCity: city }),
}));
