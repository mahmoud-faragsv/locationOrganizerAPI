import { Query } from '../config/db.js';
import { languageQueries, bundleResourceQueries } from './shared.queries.js';

export const getLangType = (params) =>
  Query(languageQueries.getLanTypeByName, `%${params}%`);

export const addToResBundle = (params) =>
  Query(bundleResourceQueries.insert, params);
