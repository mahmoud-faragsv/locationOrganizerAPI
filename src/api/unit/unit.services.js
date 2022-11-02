import { execute } from '../../config/db.js';
import unitQueries from './unit.queries.js';

export const addUnit = (query, data) => {
  return execute(query, data);
};
export const getUnit = (query, data) => {
  return execute(query, data);
};
