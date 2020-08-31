import { NamedResource } from './NamedResource';
export interface PageResult {
  count: number;
  previous: string | null;
  next: string | null;
  results: NamedResource[];
}
