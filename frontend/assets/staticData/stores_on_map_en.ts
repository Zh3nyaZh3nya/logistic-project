import { stores_en } from "./stores_en";
import { mapStoresToStoresOnMap } from "./mapStores";
import type { IStoresOnMap } from "~/types";

export const stores_on_map_en: IStoresOnMap[] = mapStoresToStoresOnMap(stores_en);
