import { products_ru } from "./products_ru";
import type {IProduct, IStores} from "~/types";

const data: IStores[] = [
    {
        "id": 1,
        "title": "Central Logistics Hub",
        "coords": [76.911446, 43.185511],
        "status": "ACTIVE",
        "work_time": "ПН-ПТ 09:00-18:00",
        "money": 41324,
        "earn_money": 20149.80,
        "products": [],
        "address": "ул. Абая, 45"
    },
    {
        "id": 2,
        "title": "North Station Warehouse",
        "coords": [76.969437, 43.329369],
        "status": "ACTIVE",
        "work_time": "ПН-СБ 10:00-20:00",
        "money": 15149.10,
        "earn_money": 9198.90,
        "products": [],
        "address": "пр. Райымбека, 120"
    },
    {
        "id": 3,
        "title": "Downtown Distribution Center",
        "coords": [76.968956, 43.329023],
        "status": "ACTIVE",
        "work_time": "ПН-ВС 10:00-22:00",
        "money": 2129.10,
        "earn_money": 18038.85,
        "products": [],
        "address": "ул. Толе би, 85"
    },
    {
        "id": 4,
        "title": "Eastside Storage Facility",
        "coords": [76.934416, 43.252142],
        "status": "ACTIVE",
        "work_time": "ПН-ПТ 08:00-17:00",
        "money": 3528.80,
        "earn_money": 1764.40,
        "products": [],
        "address": "ул. Сейфуллина, 33"
    },
    {
        "id": 5,
        "title": "West Industrial Depot",
        "coords": [76.910359, 43.256095],
        "status": "DISABLE",
        "work_time": "ПН-СБ 09:00-19:00",
        "money": 0,
        "earn_money": 0,
        "products": [],
        "address": "ул. Жандосова, 50"
    }
];

data.forEach((warehouse: IStores): void => {
    warehouse.products = products_ru.filter((product: IProduct): boolean => product.store_id === warehouse.id);
});

export const stores_ru: IStores[] = data;
