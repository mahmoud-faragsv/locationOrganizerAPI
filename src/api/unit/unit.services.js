import { execute } from '../../config/db.js';
import {
  bundleResourceQueries,
  lookUpQueries,
  languageQueries
} from './unit.queries.js';

export const addToLookUp = (data) => execute(lookUpQueries.insert, data);

export const addToResBundle = (data) =>
  execute(bundleResourceQueries.insert, data);

export const getLangType = (data) =>
  execute(languageQueries.getLanTypeByName, `%${data}%`);
