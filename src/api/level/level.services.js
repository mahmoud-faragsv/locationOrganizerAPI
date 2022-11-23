/**
 * -this module designed specifically to abstract our db queries.
 * -her we hide all the application logic from the controller to make it nice and clean.
 * -by using this module you can think that we implementing our own custom ORM(Object relational module)
 *  which her main goal is hide the db logic and just focusing on the business logic.
 * - you can find the native-mysql queries in another module called level.queries.
 * - this module acts aas a linker between the controller and the queries modules
 */

import {
  lookUpQueries,
  lookUpUnitQueries,
  resourceBundleQueries,
  typeValidationQueries
} from './level.queries.js';
import { Query } from '../../config/db.js';

export const addToLookUp = (params) => Query(lookUpQueries.insert, params);

export const getUniqueKey = (params) =>
  Query(lookUpQueries.getUniqueKey, params);

export const getSetOfLevelsIds = (params) =>
  Query(lookUpQueries.getLevelsSetIds, params);

export const addToTypeValidation = (params) =>
  Query(typeValidationQueries.insert, params);

export const getNumOfRecords = (params) =>
  Query(lookUpUnitQueries.getNumOfRecords, params);

export const updateResBndlMessageValue = (params) =>
  Query(resourceBundleQueries.updateMessageValue, params);

export const updateLookUpTitleKeyAndCustomProps = (params) =>
  Query(lookUpQueries.updateTitleKeyAndCustomProps, params);

export const getFromLookUp = (params) => Query(lookUpQueries.get, params);
