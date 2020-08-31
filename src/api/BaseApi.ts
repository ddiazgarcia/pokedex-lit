import { EndpointType } from './EndpointType';
import { PageResult } from '../models/PageResult';

export class BaseApi {
    private static readonly BASE_API_URL = 'https://pokeapi.co/api/v2';

    public static async findById<T>(
        endpoint: EndpointType,
        id: number
    ): Promise<T> {
        return BaseApi.get(`${BaseApi.BASE_API_URL}/${endpoint}/${id}`);
    }

    public static async findAll<T>(
        endpoint: EndpointType,
        pageNumber: number,
        pageSize: number
    ): Promise<PageResult<T>> {
        return BaseApi.get(`${BaseApi.BASE_API_URL}/${endpoint}`, {
            limit: pageSize,
            offset: pageNumber * pageSize,
        });
    }

    private static async get<S>(url: string, params?: object): Promise<S> {
        try {
            const response = await fetch(this.buildUrl(url, params), {
                method: 'GET',
            });

            console.log(response);
            return response.json();
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    private static buildUrl(url: string, params?: object): string {
        if (!params) {
            return url;
        }
        return `${url}?${Object.entries(params)
            .map(entry => `${entry[0]}=${entry[1].toString()}`)
            .join('&')}`;
    }
}