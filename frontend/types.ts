export type ValidationRule = ((value: any) => string | true)

export interface IMenu {
    id: number
    title_lang_key: string
    icon: string
    link: string
}

interface ITableHeader {
    id: number
    title: string
}

interface ITableContent {
    id: number
    photo: string,
    full_name: string,
    position: string,
    schedule: string,
    holiday: boolean,
    salary: number,
}

export interface ITable {
    header: {
        data: ITableHeader[]
    }
    content: {
        data: ITableContent[]
    }
}