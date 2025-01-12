import { defineStore } from "pinia";
import { stores_ru } from "~/assets/staticData/stores_ru";
import { stores_en } from "~/assets/staticData/stores_en";
import { products_ru } from "~/assets/staticData/products_ru";
import { products_en } from "~/assets/staticData/products_en";
import type { IProduct, IStores } from "~/types";

interface RootState {
    stores: IStores[];
    products: IProduct[];
}

export const useStore = defineStore({
    id: "stores",
    state: (): RootState => ({
        stores: stores_ru as IStores[],
        products: stores_ru as IProduct[]
    }),
    actions: {
        updateStoresByLocale(locale: string) {
            switch (locale) {
                case "en":
                    this.stores = stores_en as IStores[];
                    this.products = products_en as IProduct[];
                    break;
                default:
                    this.stores = stores_ru as IStores[];
                    this.products = products_ru as IProduct[];
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
