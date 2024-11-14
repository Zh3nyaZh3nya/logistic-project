import { defineStore } from 'pinia';
import type { VectorCustomizationItem } from '@yandex/ymaps3-types';

interface RootState {
    map: {
        initialZoom: number;
        customZoom: number | null;
        initialCenter: [number, number];
        customCenter: [number, number] | null;
        initialColors: VectorCustomizationItem[];
        customColors: VectorCustomizationItem[] | null;
    };
}

export const useSettingsStore = defineStore({
    id: 'settings',
    state: (): RootState => ({
        map: {
            initialZoom: 12,
            customZoom: null,
            initialCenter: [76.944764, 43.313597],
            customCenter: null,
            initialColors: [
                {
                    tags: {
                        any: ['water'],
                    },
                    elements: 'geometry',
                    stylers: [
                        {
                            color: '#000000',
                        },
                    ],
                },
                {
                    tags: {
                        any: ['landscape', 'admin', 'land', 'transit'],
                    },
                    elements: 'geometry',
                    stylers: [
                        {
                            color: '#212121',
                        },
                    ],
                },
                {
                    tags: {
                        any: ['road'],
                    },
                    elements: 'geometry',
                    stylers: [
                        {
                            color: '#4E4E4E',
                        },
                    ],
                },
                {
                    tags: {
                        any: ['building'],
                    },
                    elements: 'geometry',
                    stylers: [
                        {
                            color: '#757474',
                        },
                    ],
                },
            ],
            customColors: null
        },
    }),
});
