import { products_en } from "./products_en";
import { StoreStatus } from "~/types";
import type { IProduct, IStores } from "~/types";

const data: IStores[] = [
    {
        id: 1,
        title: "Central Logistics Hub",
        coords: [76.911446, 43.185511],
        status: StoreStatus.ACTIVE,
        work_time: "MON-FRI 09:00-18:00",
        money: 41324,
        earn_money: 20149.80,
        products: [],
        address: "45 Abay St."
    },
    {
        id: 2,
        title: "North Station Warehouse",
        coords: [76.969437, 43.329369],
        status: StoreStatus.ACTIVE,
        work_time: "MON-SAT 10:00-20:00",
        money: 15149.10,
        earn_money: 9198.90,
        products: [],
        address: "120 Raiymbek Ave."
    },
    {
        id: 3,
        title: "Downtown Distribution Center",
        coords: [76.968956, 43.329023],
        status: StoreStatus.ACTIVE,
        work_time: "MON-SUN 10:00-22:00",
        money: 2129.10,
        earn_money: 18038.85,
        products: [],
        address: "85 Tole Bi St."
    },
    {
        id: 4,
        title: "Eastside Storage Facility",
        coords: [76.934416, 43.252142],
        status: StoreStatus.ACTIVE,
        work_time: "MON-FRI 08:00-17:00",
        money: 3528.80,
        earn_money: 1764.40,
        products: [],
        address: "33 Seifullin St."
    },
    {
        id: 5,
        title: "West Industrial Depot",
        coords: [76.910359, 43.256095],
        status: StoreStatus.DISABLE,
        work_time: "MON-SAT 09:00-19:00",
        money: 0,
        earn_money: 0,
        products: [],
        address: "50 Zhandosov St."
    }
];

data.forEach((warehouse: IStores): void => {
    warehouse.products = products_en.filter((product: IProduct): boolean => product.store_id === warehouse.id);
});

export const stores_en: IStores[] = data;
