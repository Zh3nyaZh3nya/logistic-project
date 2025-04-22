// Enums
export enum ProductStatus {
    STOCK_PENDING = "STOCK_PENDING",
    NOT_AVAILABLE = "NOT_AVAILABLE",
    SELL = "SELL",
    SEND = "SEND",
    ARRIVED = "ARRIVED"
}

export enum StoreStatus {
    ACTIVE = "ACTIVE",
    DISABLE = "DISABLE"
}

// Common types
export type Time = `${number}:${number}`;
export type Weekday = "ПН" | "ВТ" | "СР" | "ЧТ" | "ПТ" | "СБ" | "ВС" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
export type DateWork = `${Weekday}-${Weekday} ${Time}-${Time}`;
export type ValidationRule = (value: any) => string | true;

// Interfaces
interface IBaseStore {
    id: number;
    title: string;
    coords: [number, number];
    address: string;
    status: StoreStatus;
    money: number;
    earn_money: number;
    work_time: DateWork;
}

export interface IStores extends IBaseStore {
    products?: IProduct[];
}

export interface IStoresOnMap extends IBaseStore {
    count_products: number;
    send_products: number;
    sell_products: number;
    arrive_products: number;
}

export interface IProduct {
    id: number;
    store_id: number;
    category: string;
    photo: string;
    title: string;
    short_desc: string;
    count: number;
    sell_count: number;
    send_count: number;
    arrive_count: number;
    price: number;
    currency: string;
    status: ProductStatus;
    time_arrive: string | null;
    time_send: string | null;
    current_coords_driver?: [number, number]
}

export interface IMember {
    id: number;
    store_id: number;
    photo: string;
    full_name: string;
    position: string;
    schedule: DateWork;
    holiday: boolean;
    salary: number;
}

export interface IMenu {
    id: number;
    title_lang_key?: string;
    title?: string;
    disabled?: boolean;
    icon: string;
    link: string;
}

export interface ITableHeader {
    title: string;
    align: string;
    sortable: boolean;
    key: string;
    width?: string;
}
