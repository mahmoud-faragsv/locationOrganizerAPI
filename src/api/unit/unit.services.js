import {
  bundleResourceQueries,
  lookUpQueries,
  languageQueries,
  typeValidationQueries
} from './unit.queries.js';
import { Query } from '../../config/db.js';

export const addToLookUp = (params) => Query(lookUpQueries.insert, params);

export const addToResBundle = (params) =>
  Query(bundleResourceQueries.insert, params);

export const getLangType = (params) =>
  Query(languageQueries.getLanTypeByName, `%${params}%`);

export const getSetOfLevelsIds = (params) =>
  Query(lookUpQueries.getLevelsSetIds, params);

export const addToTypeValidation = (params) =>
  Query(typeValidationQueries.insert, params);
