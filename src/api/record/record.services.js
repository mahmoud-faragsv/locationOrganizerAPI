import { Query } from '../../config/connection.js';

// eslint-disable-next-line import/no-cycle
import {
  lookUpQueries,
  loUnitQueries,
  typeValidationQueries,
  ViewsQueries
} from './record.queries.js';
import { bundleResourceQueries } from '../../../common/shared.queries.js';
/**
 * @async
 * @function  responsible responsible for saving new record data into the lo_unit  table
 * @param {[[[{NAME_KEY: string, UNIT_CODE: string, PARENT_ID:number|null, TYPE:number, OUID:number,IMAGE_VSID:string, ADDED_BY: number, UPDATED_BY:number, ADD_TIME: Date,UPDATE_TIME: Date}]]]} params - array of arrays each row describe a db row
 * in the type_validation table
 * @returns {Promise<[[rows],[fields]]>}- array of array holds the result of the db query
 */

export const addToLoUnit = (params) => Query(loUnitQueries.insert, params);

export const getUnitTypeId = () => Query(typeValidationQueries.selectParentId);
export const GetLookUpId = (params) => Query(lookUpQueries.selectId, params);
export const getIdByUnitCode = (params) =>
  Query(loUnitQueries.selectIdByUnitCode, params);

export const getUnitCode = (params) =>
  Query(loUnitQueries.selectUnitCode, params);
export const updateImage = (params) =>
  Query(loUnitQueries.updateMapImage, params);

/**
 * @function responsible for searching the db based on add_time and level type ex: 'Country', 'City', 'Area'..
 * @param {[ADD_TIME:Date,TYPE: string ]} params
 * @param {{[Date, string ]}} queryOptions
 * @returns {Promise<[[{ID: number, PARENT_ID: number, NAME: string, NAME_PATH: string, TYPE_ID: number, TYPE: string, CUSTOM_PROPS: { color:string},LANGUAGE_ID: number, OUID: number,UNIT_CODE: string, ADD_TIME: Date}],[fields]]>}- array of array holds the result of the db query
 */
export const searchOnLoUint = (params, queryOptions) => {
  console.log(ViewsQueries.select_from_vw_lo_units(queryOptions));
  return Query(ViewsQueries.select_from_vw_lo_units(queryOptions), params);
};

export const getRecordInfo = (params) => Query(ViewsQueries.get, params);

export const updateCodeAndImage = (params) =>
  Query(loUnitQueries.updateRecordCodeImage, params);

export const updateName = (params) =>
  Query(bundleResourceQueries.updateMessageValue, params);

export const recordGetAll = (params) => Query(loUnitQueries.get, params);
