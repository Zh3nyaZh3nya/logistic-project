import { stores_ru } from "./stores_ru";
import { mapStoresToStoresOnMap } from "./mapStores";
import type { IStoresOnMap } from "~/types";

export const stores_on_map_ru: IStoresOnMap[] = mapStoresToStoresOnMap(stores_ru);
