import { defineStore } from "pinia";
import { stores_ru } from "~/assets/staticData/stores_ru";
import { stores_en } from "~/assets/staticData/stores_en";
import { products_ru } from "~/assets/staticData/products_ru";
import { products_en } from "~/assets/staticData/products_en";
import { stores_on_map_ru } from "~/assets/staticData/stores_on_map_ru";
import { stores_on_map_en } from "~/assets/staticData/stores_on_map_en";
import { members_ru } from "assets/staticData/members_ru";
import { members_en } from "assets/staticData/members_en";
import type {IMember, IProduct, IStores, IStoresOnMap} from "~/types";

interface RootState {
    stores: IStores[];
    stores_on_map: IStoresOnMap[]
    products: IProduct[];
    members: IMember[]
}

export const useStore = defineStore({
    id: "stores",
    state: (): RootState => ({
        stores: stores_ru as IStores[],
        stores_on_map: stores_on_map_ru as IStoresOnMap[],
        products: products_en as IProduct[],
        members: members_ru as IMember[]
    }),
    actions: {
        updateStoresByLocale(locale: string) {
            switch (locale) {
                case "en":
                    this.stores = stores_en as IStores[];
                    this.products = products_en as IProduct[];
                    this.stores_on_map = stores_on_map_en as IStoresOnMap[];
                    this.members = members_en as IMember[]
                    break;
                default:
                    this.stores = stores_ru as IStores[];
                    this.products = products_ru as IProduct[];
                    this.stores_on_map = stores_on_map_ru as IStoresOnMap[];
                    this.members = members_ru as IMember[]
                    break;
            }
        }
    },
    getters: {
        GET_STORES(state: RootState): IStores[] {
            return state.stores;
        },
        GET_STORE: (state: RootState) => (id: number): IStores => {
            return state.stores.find((store: IStores): boolean => store.id === id) || state.stores[0];
        },
        GET_STORE_PRODUCTS: (state: RootState) => (id: number): IProduct[] => {
            const store = state.stores.find((store: IStores) => store.id === id);
            return store?.products ?? [];
        },
        GET_MEMBERS_OF_STORE: (state: RootState) => (store_id: number): IMember[] => {
            return state.members.filter(item => item.store_id === store_id)
        }
    }
});
