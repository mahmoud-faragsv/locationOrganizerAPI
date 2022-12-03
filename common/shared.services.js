import { Query } from '../src/config/connection.js';
import { languageQueries, bundleResourceQueries } from './shared.queries.js';

export const getLangType = (params) =>
  Query(languageQueries.getLanTypeByName, `%${params}%`);

/**
 * @async
 * @function  responsible for saving the client values inside the resource_bundle
 * table, each value will linked with a unique key(message_key), this unique key will be then
 * stored in the other tables which describe the user value in  those tables
 * @param {[string]} params - the bulk(group of rows 'access db once') which needed to be injected in the query before access db
 * @returns { Promise<[[rows],[fields]]> }- array of array holds the result of the db query
 */
export const addToResBundle = (params) =>
  Query(bundleResourceQueries.insert, params);
export const getMsgKey = (params) =>
  Query(bundleResourceQueries.selectMessageKey, params);

export const getMsgValue = (params) =>
  Query(bundleResourceQueries.selectMsgValue, params);
