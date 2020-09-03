import { EntityMap, ListMap, NameMap } from '../redux/states/DataState';
import { EntityType } from '../models/EntityType';
import { NamedResource } from '../models/NamedResource';
import '../utils/lz-string';

export class LocalStorageApi {
    public static readonly ENTITY_MAP_KEY = 'entityMap';
    public static readonly LIST_MAP_KEY = 'listMap';
    //private static readonly BYTE_THRESHOLD = 5 * 10 ** 6;

    public static getEntityMap(): EntityMap {
        return this.get(this.ENTITY_MAP_KEY);
    }

    public static saveEntityMap(map: EntityMap) {
        return this.save(this.ENTITY_MAP_KEY, map);
    }

    public static getEntity<T>(type: EntityType, entityName: string): T {
        return this.get(`${this.ENTITY_MAP_KEY}-${type}-${entityName}`);
    }

    public static getEntitiesByType(type: EntityType): NameMap {
        return this.get(`${this.ENTITY_MAP_KEY}-${type}`);
    }

    public static saveEntitiesByType(type: EntityType, nameMap: NameMap) {
        this.save(`${this.ENTITY_MAP_KEY}-${type}`, nameMap);
    }

    public static saveEntity<T extends NamedResource>(
        type: EntityType,
        entity: T
    ): void {
        this.save(`${this.ENTITY_MAP_KEY}-${type}-${entity.name}`, entity);
    }

    public static getListMap(): ListMap {
        return this.get(this.LIST_MAP_KEY);
    }

    public static saveListMap(listMap: ListMap) {
        this.save(this.LIST_MAP_KEY, listMap);
    }

    private static get<T>(key: string): any {
        const value = globalThis.localStorage.getItem(key);
        try {
            return JSON.parse(value!) as T;
        } catch (err) {
            try {
                // value is compressed. Uncompress it
                const decompressedValue = globalThis.LZString.decompress(
                    value!
                );
                return JSON.parse(decompressedValue!) as T;
            } catch (err2) {
                return null;
            }
        }
    }

    private static save(key: string, value: unknown): void {
        let stringifiedValue = JSON.stringify(value);
        //const byteLength = new TextEncoder().encode(stringifiedValue).length;
        //if (byteLength >= this.BYTE_THRESHOLD) {
        stringifiedValue = globalThis.LZString.compress(stringifiedValue);
        //}
        try {
            globalThis.localStorage.setItem(key, stringifiedValue);
        } catch (error) {
            console.error(`Size of key ${key}: ${stringifiedValue.length}`);
        }
    }
}
