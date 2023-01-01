/* eslint-disable prettier/prettier */
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
  typeValidationQueries,
  loUnitQueries
} from './level.queries.js';
import { Query } from '../../config/connection.js';
import { bundleResourceQueries as sharedRescBundle } from '../../../common/shared.queries.js';

/**
 * @async
 * @function  responsible for saving the levels into the lookup table (saving the message_key not
 *   client levels name )
 * @param {[[UNIQUE_KEY: string, CATEGORY: number, TITLE_KEY: string,PARENT_ID:number ,CUSTOM_PROPS:{color:string} ]]} params - the bulk(group of rows 'access db once') which needed to be injected in the query before access db
 * @returns {Promise<[[rows],[fields]]>}- array of array holds the result of the db query
 */
export const addToLookUp = (params) => {
  console.log('Inside level.service.addToLookUp function');

  console.log('lookUpQueries.insert:', lookUpQueries.insert);
  console.log('params:', params);

  return Query(lookUpQueries.insert, params);
};

export const getUniqueKey = (params) => {
  console.log('Inside level.service. function');

  console.log('lookUpQueries.getUniqueKey:', lookUpQueries.getUniqueKey);
  console.log('params:', params);

  return Query(lookUpQueries.getUniqueKey, params);
};
/**
 * @async
 * @function  responsible for selecting all matched IDs from lookup table based on set of message_keys
 * @param {[string]} params - array of message_keys
 * @returns {Promise<[[{ID:number,TITLE_KEY: string }],[fields]]>}- array of array holds the result of the db query
 */
export const getLevelsIDs = (params) => {
  console.log('Inside level.service.getLevelsIDs function');

  console.log('lookUpQueries.getLevelsSetIds:', lookUpQueries.getLevelsSetIds);
  console.log('params:', params);

  return Query(lookUpQueries.getLevelsSetIds, params);
};

/**
 * @async
 * @function  responsible for inserting the relations between the levels with each others
 * @param {[[{TYPE_ID: number, ALLOWED_CHILD_TYPE_ID: number}]]} params - array of arrays each row describe a db row
 * in the type_validation table
 * @returns {Promise<[[rows],[fields]]>}- array of array holds the result of the db query
 */
export const addToTypeValidation = (params) => {
  console.log('Inside level.service.addToTypeValidation function');

  console.log('typeValidationQueries.insert:', typeValidationQueries.insert);
  console.log('params:', params);

  return Query(typeValidationQueries.insert, params);
};

export const getNumOfRecords = (params) => {
  console.log('Inside level.service.getNumOfRecords function');

  console.log('lookUpUnitQueries.getNumOfRecords:', lookUpUnitQueries.getNumOfRecords);
  console.log('params:', params);

  return Query(lookUpUnitQueries.getNumOfRecords, params);
};

export const updateResBndlMessageValue = (params) => {
  console.log('Inside level.service.updateResBndlMessageValue function');

  console.log('resourceBundleQueries.updateMessageValue:', resourceBundleQueries.updateMessageValue);
  console.log('params:', params)

  return Query(resourceBundleQueries.updateMessageValue, params);
};
export const updateLookUpTitleKeyAndCustomProps = (params) => {
  console.log('Inside level.service.updateLookUpTitleKeyAndCustomProps function');

  console.log(' lookUpQueries.updateTitleKeyAndCustomProps:', lookUpQueries.updateTitleKeyAndCustomProps);
  console.log('params:', params);


  return Query(lookUpQueries.updateTitleKeyAndCustomProps, params);
};

export const getFromLookUp = (params) => {
  console.log('Inside level.service.getFromLookUp function');

  console.log('  lookUpQueries.get:', lookUpQueries.get);
  console.log('params:', params);

  return Query(lookUpQueries.get, params);
};

/**
 * @async
 * @function  responsible for fetching all the client levels(categories)
 * @param {[CATEGORY: number, LANGUAGE_ID: number]} params
 * @returns {Promise<[[{LANGUAGE_ID: number ,MESSAGE_VALUE: string}],[fields]]>}- array of arrays holds the result of the db query
 */
export const getLevels = (params) => {
  console.log('Inside level.service.getLevels function');

  console.log('sharedRescBundle.selectLevelsByLangAndCategory:', sharedRescBundle.selectLevelsByLangAndCategory);
  console.log('params:', params);

  return Query(sharedRescBundle.selectLevelsByLangAndCategory, params);
};

export const getRootLevelType = (params) => {
  console.log('Inside level.service.getRootLevelType function');

  console.log('  lookUpUnitQueries.selectAllLevelsIds:', resourceBundleQueries.selectRootLevelType);
  console.log('params:', params);

  return Query(resourceBundleQueries.selectRootLevelType, params);
};

export const getAllLevelsIds = (params) => {
  console.log('Inside level.service.getAllLevelsIds function');

  console.log('  lookUpUnitQueries.selectAllLevelsIds:', lookUpUnitQueries.selectAllLevelsIds);
  console.log('params:', params);

  return Query(lookUpUnitQueries.selectAllLevelsIds, params);
};

export const getAllAllowedChildrenIds = (params) => {
  console.log('Inside level.service.getAllAllowedChildrenIds function');

  console.log('typeValidationQueries.selectAllAllowedChildrenIDs:', typeValidationQueries.selectAllAllowedChildrenIDs);
  console.log('params:', params);

  return Query(typeValidationQueries.selectAllAllowedChildrenIDs, params);
};

export const getRootLevel = (params) => {
  console.log('Inside level.service.getRootLevel function');

  console.log('resourceBundleQueries.selectRootLevel:', resourceBundleQueries.selectRootLevel);
  console.log('params:', params);

  return Query(resourceBundleQueries.selectRootLevel, params);
};

export const getAllRecordsAndSort = (params, queryOptions) => {
  console.log('Inside level.service.getAllRecordsAndSort function');

  console.log('loUnitQueries.getAllRecordsAndSortIt:', loUnitQueries.getAllRecordsAndSortIt(queryOptions));
  console.log('params:', params);

  return Query(loUnitQueries.getAllRecordsAndSortIt(queryOptions), params);
};
