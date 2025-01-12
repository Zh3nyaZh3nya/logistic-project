export type ValidationRule = ((value: any) => string | true)
export type StatusesProducts =
    "STOCK_PENDING" |  // ЗАПАС ОЖИДАЕТСЯ
    "NOT_AVAILABLE" |  // НЕДОСТУПНО
    "SELL" |           // ПРОДАН
    "SEND" |           // ОТПРАВЛЕН
    "ARRIVED"          // ПРИБЫЛ

export type Weekday = "ПН" | "ВТ" | "СР" | "ЧТ" | "ПТ" | "СБ" | "ВС";
export type Time = `${string}:${string}`;
export type DateWork = `${Weekday}-${Weekday} ${Time}-${Time}`;
export type MonthWithTime = `${string} ~${Time}-${Time}`;

export interface IMenu {
    id: number
    title_lang_key?: string
    title?: string
    disabled?: boolean
    icon: string
    link: string
}

export interface ITableHeader {
    title: string
    align: string
    sortable: boolean
    key: string
    width: string
}

export interface IStores {
    id: number
    title: string
    coords: [number, number]
    status: "ACTIVE" | "DISABLE"
    work_time: DateWork
    money: number
    earn_money: number
    products: IProduct[] | []

}

export interface IProduct {
    id: number
    store_id: number
    category: string
    photo: string
    title: string
    short_desc: string
    count: number
    sell_count: number
    send_count: number
    arrive_count: number
    price: number
    currency: string
    status: StatusesProducts
    time_arrive: MonthWithTime | null
    time_send: MonthWithTime | null
}

interface IMember {
    id: number
    store_id: number
    photo: string,
    full_name: string,
    position: string,
    schedule: DateWork,
    holiday: boolean,
    salary: number,

}

