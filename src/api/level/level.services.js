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
import { Query } from '../../config/connection.js';
import { bundleResourceQueries } from '../../../common/shared.queries.js';

/**
 * @async
 * @function  responsible for saving the levels into the lookup table (saving the message_key not
 *   client levels name )
 * @param {[[UNIQUE_KEY: string, CATEGORY: number, TITLE_KEY: string,PARENT_ID:number ,CUSTOM_PROPS:{color:string} ]]} params - the bulk(group of rows 'access db once') which needed to be injected in the query before access db
 * @returns {Promise<[[rows],[fields]]>}- array of array holds the result of the db query
 */
export const addToLookUp = (params) => Query(lookUpQueries.insert, params);

export const getUniqueKey = (params) =>
  Query(lookUpQueries.getUniqueKey, params);

/**
 * @async
 * @function  responsible for selecting all matched IDs from lookup table based on set of message_keys
 * @param {[string]} params - array of message_keys
 * @returns {Promise<[[{ID:number,TITLE_KEY: string }],[fields]]>}- array of array holds the result of the db query
 */
export const getLevelsIDs = (params) =>
  Query(lookUpQueries.getLevelsSetIds, params);

/**
 * @async
 * @function  responsible for inserting the relations between the levels with each others
 * @param {[[{TYPE_ID: number, ALLOWED_CHILD_TYPE_ID: number}]]} params - array of arrays each row describe a db row
 * in the type_validation table
 * @returns {Promise<[[rows],[fields]]>}- array of array holds the result of the db query
 */
export const addToTypeValidation = (params) =>
  Query(typeValidationQueries.insert, params);

export const getNumOfRecords = (params) =>
  Query(lookUpUnitQueries.getNumOfRecords, params);

export const updateResBndlMessageValue = (params) =>
  Query(resourceBundleQueries.updateMessageValue, params);

export const updateLookUpTitleKeyAndCustomProps = (params) =>
  Query(lookUpQueries.updateTitleKeyAndCustomProps, params);

export const getFromLookUp = (params) => Query(lookUpQueries.get, params);
/**
 * @async
 * @function  responsible for fetching all the client levels(categories)
 * @param {[CATEGORY: number, LANGUAGE_ID: number]} params
 * @returns {Promise<[[{LANGUAGE_ID: number ,MESSAGE_VALUE: string}],[fields]]>}- array of arrays holds the result of the db query
 */
export const getLevels = (params) =>
  Query(bundleResourceQueries.selectLevelsByLangAndCategory, params);

export const getRootLevelType = (params) =>
  Query(lookUpQueries.selectRootLevelType, params);
