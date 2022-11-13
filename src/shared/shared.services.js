import { Query } from '../config/db.js';
import { languageQueries } from './shared.queries.js';

export const getLangType = (params) =>
  Query(languageQueries.getLanTypeByName, `%${params}%`);
export const getLangType2 = () => {};
