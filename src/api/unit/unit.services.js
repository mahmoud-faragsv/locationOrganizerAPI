/**
 * -this module designed specifically to abstract our db queries.
 * -her we hide all the application logic from the controller to make it nice and clean.
 * -by using this module you can think that we implementing our own custom ORM(Object relational module)
 *  which her main goal is hide the db logic and just focusing on the business logic.
 * - you can find the native-mysql queries in another module called unit.queries.
 * - this module acts aas a linker between the controller and the queries modules
 */

import { lookUpQueries, typeValidationQueries } from './unit.queries.js';
import { Query } from '../../config/db.js';

export const addToLookUp = (params) => Query(lookUpQueries.insert, params);

export const getSetOfLevelsIds = (params) =>
  Query(lookUpQueries.getLevelsSetIds, params);

export const addToTypeValidation = (params) =>
  Query(typeValidationQueries.insert, params);
