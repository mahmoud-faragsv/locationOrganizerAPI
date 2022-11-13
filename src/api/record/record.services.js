import { Query } from '../../config/db.js';

import {
  lookUpQueries,
  loUnitQueries,
  typeValidationQueries
} from './record.queries.js';

export const addToLoUnit = (params) => Query(loUnitQueries.insert, params);

export const getUnitTypeId = () => Query(typeValidationQueries.selectParentId);
export const GetLookUpId = (params) => Query(lookUpQueries.selectId, params);
