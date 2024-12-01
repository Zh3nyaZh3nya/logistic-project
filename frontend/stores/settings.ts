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
        newCustomization: VectorCustomizationItem[]
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
            customColors: null,
            newCustomization: [],
        },
    }),
    actions: {
        updateMapSettings(longitude: number | null, latitude: number | null, zoom: number | null): boolean {
            if (zoom !== null || (longitude !== null && latitude !== null)) {
                this.map.customCenter = [
                    longitude ?? this.map.initialCenter[0],
                    latitude ?? this.map.initialCenter[1],
                ];
                this.map.customZoom = zoom;
                return true;
            }
            return false;
        },
        dropMapChanges(): void {
            this.map.customZoom = null;
            this.map.customCenter = null;
            this.map.customColors = null;
            this.map.newCustomization = [];
        },
        saveOrDropChangesColors(type: 'save' | 'drop'): void {
            if (type === 'save') {
                this.map.customColors = [...this.map.newCustomization];
            } else {
                this.map.customColors = null;
                this.map.newCustomization = [];
            }
        },
        updateCustomization(newColor: string, newVariant: string, tags: string[]): void {
            const existingCustomization = this.map.newCustomization.find((item) => {
                if (item.tags && typeof item.tags === 'object' && 'any' in item.tags) {
                    const anyTags = item.tags.any;
                    return Array.isArray(anyTags) ? anyTags.includes(newVariant) : anyTags === newVariant;
                }
                return false;
            });

            if (existingCustomization) {
                if (Array.isArray(existingCustomization.stylers)) {
                    existingCustomization.stylers[0].color = newColor;
                } else if (existingCustomization.stylers) {
                    existingCustomization.stylers.color = newColor;
                }
            } else {
                this.map.newCustomization.push({
                    tags: {
                        any: tags,
                    },
                    elements: 'geometry',
                    stylers: [
                        {
                            color: newColor,
                        },
                    ],
                });
            }
        },
    },
    getters: {
        currentCenter: (state: RootState) =>
            state.map.customCenter ?? state.map.initialCenter,
        currentZoom: (state: RootState) =>
            state.map.customZoom ?? state.map.initialZoom,
        currentCustomization: (state: RootState) =>
            state.map.customColors ?? (state.map.newCustomization.length > 0 ? state.map.newCustomization : state.map.initialColors),
    },

});
