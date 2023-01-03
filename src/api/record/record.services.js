/* eslint-disable prettier/prettier */
import { Query } from '../../config/connection.js';

// eslint-disable-next-line import/no-cycle
import {
  lookUpQueries,
  loUnitQueries,
  resourceBundleQueries,
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

export const addToLoUnit = (params) => {
  console.log('Inside record.service.addToLoUnit function');

  console.log(' loUnitQueries.insert:', loUnitQueries.insert);
  console.log('params:', params);

  return Query(loUnitQueries.insert, params);
};

export const getUnitTypeId = () => {
  console.log('Inside record.service.getUnitTypeId function');

  console.log(
    'typeValidationQueries.selectParentId:',
    typeValidationQueries.selectParentId
  );
  console.log('params:');

  return Query(typeValidationQueries.selectParentId);
};

export const GetLookUpId = (params) => {
  console.log('Inside record.service.GetLookUpId function');
  console.log('params:', params);

  return Query(lookUpQueries.selectId, params);
};

export const getIdByUnitCode = (params) => {
  console.log('Inside record.service.getIdByUnitCode function');

  console.log(
    'loUnitQueries.selectIdByUnitCode:',
    loUnitQueries.selectIdByUnitCode
  );
  console.log('params:', params);

  return Query(loUnitQueries.selectIdByUnitCode, params);
};

export const getUnitCode = (params) => {
  console.log('Inside record.service.getUnitCode function');

  console.log(' loUnitQueries.selectUnitCode:', loUnitQueries.selectUnitCode);
  console.log('params:', params);

  return Query(loUnitQueries.selectUnitCode, params);
};

export const updateImage = (params) => {
  console.log('Inside record.service.updateImage function');

  console.log('loUnitQueries.updateMapImage:', loUnitQueries.updateMapImage);
  console.log('params:', params);

  return Query(loUnitQueries.updateMapImage, params);
};

/**
 * @function responsible for searching the db based on add_time and level type ex: 'Country', 'City', 'Area'..
 * @param {[ADD_TIME:Date,TYPE: string ]} params
 * @param {{[Date, string ]}} queryOptions
 * @returns {Promise<[[{ID: number, PARENT_ID: number, NAME: string, NAME_PATH: string, TYPE_ID: number, TYPE: string, CUSTOM_PROPS: { color:string},LANGUAGE_ID: number, OUID: number,UNIT_CODE: string, ADD_TIME: Date}],[fields]]>}- array of array holds the result of the db query
 */
export const searchOnLoUint = (params, queryOptions) => {
  console.log('Inside record.service.searchOnLoUint function');

  console.log(
    ' ViewsQueries.select_from_vw_lo_units:',
    ViewsQueries.select_from_vw_lo_units(queryOptions)
  );
  console.log('params:', params);

  return Query(ViewsQueries.select_from_vw_lo_units(queryOptions), params);
};

export const getRecordInfo = (params) => {
  console.log('Inside record.service.getRecordInfo function');

  console.log('ViewsQueries.get:', ViewsQueries.get);
  console.log('params:', params);

  return Query(ViewsQueries.get, params);
};

export const updateCodeAndImage = (params) => {
  console.log('Inside record.service.updateCodeAndImage function');

  console.log(
    '  loUnitQueries.updateRecordCodeImage:',
    loUnitQueries.updateRecordCodeImage
  );
  console.log('params:', params);

  return Query(loUnitQueries.updateRecordCodeImage, params);
};

export const updateName = (params) => {
  console.log('Inside record.service.updateName function');

  console.log(
    'bundleResourceQueries.updateMessageValue:',
    bundleResourceQueries.updateMessageValue
  );
  console.log('params:', params);

  return Query(bundleResourceQueries.updateMessageValue, params);
};

export const recordGetAll = (params) => {
  console.log('Inside record.service.updateName function');

  console.log('  loUnitQueries.get:', loUnitQueries.get);
  console.log('params:', params);

  return Query(loUnitQueries.get, params);
};

export const selectRecordsByOUID = (params) => {
  console.log('Inside record.service.selectRecordsByOUID function');

  console.log(
    'resourceBundleQueries.getAllRecordsByOUID:',
    resourceBundleQueries.getAllRecordsByOUID
  );
  console.log('params:', params);

  return Query(resourceBundleQueries.getAllRecordsByOUID, params);
};

export const updateTime = (params) => {
  console.log('Inside record.services.updateTime function');

  console.log(
    'loUnitQueries.updateUpdateTime: ',
    loUnitQueries.updateUpdateTime
  );
  console.log('params: ', params);

  return Query(loUnitQueries.updateUpdateTime, params);
};
