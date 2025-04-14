import type { IStores, IStoresOnMap, IProduct } from "~/types";

export function mapStoresToStoresOnMap(stores: IStores[]): IStoresOnMap[] {
    return stores.map((store: IStores): IStoresOnMap => {
        const { products = [], ...rest } = store;

        const {
            count_products,
            send_products,
            sell_products,
            arrive_products,
        } = products.reduce(
            (acc, item) => {
                acc.count_products += item.count;
                acc.send_products += item.send_count;
                acc.sell_products += item.sell_count;
                acc.arrive_products += item.arrive_count;
                return acc;
            },
            {
                count_products: 0,
                send_products: 0,
                sell_products: 0,
                arrive_products: 0,
            }
        );

        return {
            ...rest,
            count_products,
            send_products,
            sell_products,
            arrive_products,
        };
    });
}

