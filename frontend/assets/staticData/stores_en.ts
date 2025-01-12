import { products_en } from "./products_en.ts";
import type { IStores } from "~/types";

const data: IStores[] = [
    {
        "id": 1,
        "title": "Central Logistics Hub",
        "coords": [55.751244, 37.618423],
        "status": "ACTIVE",
        "work_time": "MON-FRI 09:00-18:00",
        "products": []
    },
    {
        "id": 2,
        "title": "North Station Warehouse",
        "coords": [59.93428, 30.335099],
        "status": "DISABLE",
        "work_time": "MON-SAT 10:00-20:00",
        "products": []
    },
    {
        "id": 3,
        "title": "Downtown Distribution Center",
        "coords": [56.838926, 60.605703],
        "status": "ACTIVE",
        "work_time": "MON-SUN 10:00-22:00",
        "products": []
    },
    {
        "id": 4,
        "title": "Eastside Storage Facility",
        "coords": [48.707103, 44.516939],
        "status": "ACTIVE",
        "work_time": "MON-FRI 08:00-17:00",
        "products": []
    },
    {
        "id": 5,
        "title": "West Industrial Depot",
        "coords": [43.222015, 76.851248],
        "status": "DISABLE",
        "work_time": "MON-SAT 09:00-19:00",
        "products": []
    }
];

data.forEach(warehouse => {
    warehouse.products = products_en.filter(product => product.store_id === warehouse.id);
});

export const stores_en: IStores[] = data;
