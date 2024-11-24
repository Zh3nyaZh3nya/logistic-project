import {useRuntimeConfig} from "nuxt/app";
import {useI18n} from "vue-i18n";

type ApiMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IRequestOptions {
    method: ApiMethods;
    body?: string;
    headers: Record<string, string>;
    agent?: any;
}

interface IApiOptions {
    method?: ApiMethods;
    body?: any;
    cache?: boolean;
    ttl?: number;
}

export const useApi = () => {
    const config: string | unknown = useRuntimeConfig().public.apiUrl;
    const { locale } = useI18n();

    const DEFAULT_TTL: number = 900_000; // 15 минут в миллисекундах

    async function $api<T>(
        path: string,
        options: IApiOptions = {}
    ): Promise<T> {
        const { method = 'GET', body, cache = true, ttl = DEFAULT_TTL } = options;

        try {
            const url: string = config + path;
            const cacheKey: string = `${url}:${locale.value}`;
            const cacheTimestampKey: string = `${cacheKey}:timestamp`;

            if (method === 'GET' && cache && typeof window !== 'undefined') {
                const cachedResponse: string | null = localStorage.getItem(cacheKey);
                const cacheTimestamp: string | null = localStorage.getItem(cacheTimestampKey);
                if (cachedResponse && cacheTimestamp) {
                    const age: number = Date.now() - parseInt(cacheTimestamp, 10);
                    if (age < ttl) {
                        return JSON.parse(cachedResponse) as T;
                    } else {
                        localStorage.removeItem(cacheKey);
                        localStorage.removeItem(cacheTimestampKey);
                    }
                }
            }

            const requestOptions: IRequestOptions = {
                method,
                body: ['POST', 'PUT'].includes(method) ? JSON.stringify(body) : undefined,
                headers: {
                    ...((method === 'POST' || method === 'PUT') && { 'Content-Type': 'application/json' }),
                    'Accept-Language': locale.value,
                },
            };

            const response: T = await $fetch<T>(url, requestOptions);

            if (method === 'GET' && cache && typeof window !== 'undefined') {
                localStorage.setItem(cacheKey, JSON.stringify(response));
                localStorage.setItem(cacheTimestampKey, Date.now().toString());
            }

            return response;
        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    }

    return { $api };
};
