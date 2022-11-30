import { Query } from '../../config/connection.js';

import {
  lookUpQueries,
  loUnitQueries,
  typeValidationQueries,
  ViewsQueries
} from './record.queries.js';

export const addToLoUnit = (params) => Query(loUnitQueries.insert, params);

export const getUnitTypeId = () => Query(typeValidationQueries.selectParentId);
export const GetLookUpId = (params) => Query(lookUpQueries.selectId, params);
export const getIdByUnitCode = (params) =>
  Query(loUnitQueries.selectIdByUnitCode, params);

export const getUnitCode = (params) =>
  Query(loUnitQueries.selectUnitCode, params);
export const updateImage = (params) =>
  Query(loUnitQueries.updateMapImage, params);

export const searchOnLoUint = (params, queryOptions) =>
  Query(ViewsQueries.select_from_vw_lo_units(queryOptions), params);
