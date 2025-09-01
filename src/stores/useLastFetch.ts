import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type LastFetchStoreState = {
	lastFetchTimestamp: number;
	setLastFetchTimestamp: (timestamp: number) => void;
};

export const useLastFetchStore = create<LastFetchStoreState>()(
	persist(
		(set) => ({
			lastFetchTimestamp: 0,
			setLastFetchTimestamp: (timestamp) =>
				set({ lastFetchTimestamp: timestamp }),
		}),
		{
			name: 'lastFetchTimestamp',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
