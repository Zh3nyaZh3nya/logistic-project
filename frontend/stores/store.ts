import { defineStore } from "pinia";
import { stores_ru } from "~/assets/staticData/stores_ru";
import { stores_en } from "~/assets/staticData/stores_en";
import { products_ru } from "~/assets/staticData/products_ru";
import { products_en } from "~/assets/staticData/products_en";
import { stores_on_map_ru } from "~/assets/staticData/stores_on_map_ru";
import { stores_on_map_en } from "~/assets/staticData/stores_on_map_en";
import type { IProduct, IStores, IStoresOnMap } from "~/types";

interface RootState {
    stores: IStores[];
    stores_on_map: IStoresOnMap[]
    products: IProduct[];
}

export const useStore = defineStore({
    id: "stores",
    state: (): RootState => ({
        stores: stores_ru as IStores[],
        stores_on_map: stores_on_map_ru as IStoresOnMap[],
        products: products_en as IProduct[],
    }),
    actions: {
        updateStoresByLocale(locale: string) {
            switch (locale) {
                case "en":
                    this.stores = stores_en as IStores[];
                    this.products = products_en as IProduct[];
                    this.stores_on_map = stores_on_map_en as IStoresOnMap[];
                    break;
                default:
                    this.stores = stores_ru as IStores[];
                    this.products = products_ru as IProduct[];
                    this.stores_on_map = stores_on_map_ru as IStoresOnMap[];
                    break;
            }
        }
    },
    getters: {
        GET_STORES(state: RootState): IStores[] {
            return state.stores;
        },
        GET_STORE: (state: RootState) => (id: number): IStores => {
            return state.stores.find((store: IStores): boolean => store.id === id);
        },
        GET_STORE_PRODUCTS: (state: RootState) => (id: number): IProduct[] => {
            return state.stores.find((store: IStores): boolean => store.id === id)?.products;
        }
    }
});
