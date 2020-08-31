export enum ActionType {
  PokemonSuccess = 'PokemonSuccess',
}

export interface Action<T> {
  type: ActionType;
  payload: T | T[];
}
