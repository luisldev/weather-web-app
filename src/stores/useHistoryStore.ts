import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { LocationType } from '../types/LocationType';

type HistoryStoreState = {
	history: LocationType[];
	addHistory: (newValue: LocationType) => void;
	removeHistoryItem: (historyToRemove: LocationType) => void;
	removeAllHistory: () => void;
};

export const useHistoryStore = create<HistoryStoreState>()(
	persist(
		(set, get) => ({
			history: [],
			addHistory: (newValue) => {
				if (!newValue || !newValue.name) return;
				const current = get().history;
				const filtered = current.filter(
					(item) =>
						item.name !== newValue.name ||
						item.lat !== newValue.lat ||
						item.lon !== newValue.lon,
				);
				const newHistory = [newValue, ...filtered].slice(0, 3);
				set({ history: newHistory });
			},
			removeHistoryItem: (historyToRemove) => {
				const filtered = get().history.filter(
					(item) => item.name !== historyToRemove.name,
				);
				set({ history: filtered });
			},
			removeAllHistory: () => set({ history: [] }),
		}),
		{
			name: 'history',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
