import { EntityType } from '../../models/EntityType';
import { NamedResource } from '../../models/NamedResource';

export type EntityMap = {
    [entityType: string]: NameMap;
};

export type NameMap = {
    [name: string]: NamedResource;
};
export type ListMap = {
    [entityType: string]: NamedResource[];
};

export class DataState {
    public constructor(public entityMap: EntityMap, public listMap: ListMap) {
        this.entityMap = entityMap;
        this.listMap = listMap;
    }

    public static initial() {
        return new DataState({}, {});
    }

    getList(type: EntityType | string): Array<NamedResource> {
        return this.listMap[type] || [];
    }

    getEntity(type: EntityType | string, name: string): unknown {
        const typeMap = this.entityMap[type];
        if (typeMap) {
            return typeMap[name];
        }
        return undefined;
    }

    getEntities<T extends NamedResource>(type: EntityType | string): T[] {
        const typeMap = this.entityMap[type];
        if (!typeMap) {
            return [];
        }
        return Object.entries(typeMap).map(([, value]) => value as T);
    }
}
