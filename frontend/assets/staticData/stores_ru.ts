import { products_ru } from "./products_ru";
import type { IStores } from "~/types";

const data: IStores[] = [
    {
        "id": 1,
        "title": "Central Logistics Hub",
        "coords": [55.751244, 37.618423],
        "status": "ACTIVE",
        "work_time": "ПН-ПТ 09:00-18:00",
        money: 41324,
        earn_money: 20149.80,
        "products": []
    },
    {
        "id": 2,
        "title": "North Station Warehouse",
        "coords": [59.93428, 30.335099],
        "status": "ACTIVE",
        "work_time": "ПН-СБ 10:00-20:00",
        money: 15149.10,
        earn_money: 9198.90,
        "products": []
    },
    {
        "id": 3,
        "title": "Downtown Distribution Center",
        "coords": [56.838926, 60.605703],
        "status": "ACTIVE",
        "work_time": "ПН-ВС 10:00-22:00",
        money: 2129.10,
        earn_money: 18038.85,
        "products": []
    },
    {
        "id": 4,
        "title": "Eastside Storage Facility",
        "coords": [48.707103, 44.516939],
        "status": "ACTIVE",
        "work_time": "ПН-ПТ 08:00-17:00",
        money: 3528.80,
        earn_money: 1764.40,
        "products": []
    },
    {
        "id": 5,
        "title": "West Industrial Depot",
        "coords": [43.222015, 76.851248],
        "status": "DISABLE",
        "work_time": "ПН-СБ 09:00-19:00",
        money: 0,
        earn_money: 0,
        "products": []
    }
]

data.forEach(warehouse => {
    warehouse.products = products_ru.filter(product => product.store_id === warehouse.id);
});

export const stores_ru: IStores[] = data;
