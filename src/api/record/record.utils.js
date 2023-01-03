// eslint-disable-next-line import/no-cycle
import { addToLoUnit } from './record.services.js';
import { addToResBundle } from '../../../common/shared.services.js';
/**
 * @function - building a dynamic slq query based on client search options(type, date)
 * @param {[string]} options - array of expected client query options
 * @returns { string| null} query  -   query | null
 */
export const buildSearchQuery = (options) => {
  // TYPE
  // ADD_TIME_FROM
  // ADD_TIME_TO
  // RECORD_NAME

  // - TYPE ✔
  // - RECORD_NAME ✔
  // -----------------
  // - TYPE and RECORD_NAME ✔
  // - ADD_TIME_FROM and RECORD_NAME ✔
  // - ADD_TIME_FROM and ADD_TIME_TO ✔
  // - ADD_TIME_FROM and now() ✔
  // -------------------------
  // - TYPE and ADD_TIME_FROM and now() ✔
  // - TYPE and ADD_TIME_FROM and RECORD_NAME ✔
  // - TYPE and ADD_TIME_FROM and ADD_TIME_TO ✔
  // - ADD_TIME_FROM and ADD_TIME_TO and RECORD_NAME ✔
  // - RECORD_NAME and ADD_TIME_FROM and now() ✔
  // ---------------------------------
  // - TYPE and ADD_TIME_FROM and ADD_TIME_TO and RECORD_NAME ✔
  // - TYPE and ADD_TIME_FROM and now() and RECORD_NAME ✔
  if (options.length === 0) return null;

  // - TYPE ✔
  if (options.length === 1 && options.includes('TYPE'))
    return 'SELECT * FROM vw_lo_units WHERE TYPE = ? ;';

  // - RECORD_NAME ✔
  if (options.length === 1 && options.includes('RECORD_NAME')) {
    return `SELECT * FROM vw_lo_units WHERE NAME LIKE replace("%'?'%",'''','')`;
  }

  // - TYPE and RECORD_NAME ✔
  if (
    options.length === 2 &&
    options.includes('TYPE') &&
    options.includes('RECORD_NAME')
  ) {
    return `SELECT * FROM vw_lo_units WHERE  TYPE = ? AND NAME LIKE replace("%'?'%",'''','')  `;
  }

  // - RECORD_NAME and ADD_TIME_FROM and now() ✔
  if (
    options.length === 2 &&
    options.includes('ADD_TIME_FROM') &&
    options.includes('RECORD_NAME')
  )
    return `SELECT * FROM vw_lo_units WHERE ADD_TIME between ? AND now() AND NAME LIKE replace("%'?'%",'''','')`;

  // - ADD_TIME_FROM and ADD_TIME_TO ✔
  if (
    options.length === 2 &&
    options.includes('ADD_TIME_FROM') &&
    options.includes('ADD_TIME_TO')
  )
    return `SELECT * FROM vw_lo_units WHERE ADD_TIME between ? AND ? `;

  // - ADD_TIME_FROM and now() ✔
  if (options.length === 1 && options.includes('ADD_TIME_FROM'))
    return `SELECT * FROM vw_lo_units WHERE ADD_TIME between  ? AND now();`;

  // - TYPE and ADD_TIME_FROM and now() ✔
  if (
    options.length === 2 &&
    options.includes('TYPE') &&
    options.includes('ADD_TIME_FROM')
  )
    return `SELECT * FROM vw_lo_units WHERE TYPE = ? AND ADD_TIME  between  ? AND now()`;

  // - ADD_TIME_FROM and RECORD_NAME ✔
  if (
    options.length === 2 &&
    options.includes('ADD_TIME_FROM') &&
    options.includes('RECORD_NAME')
  )
    return `SELECT * FROM vw_lo_units WHERE ADD_TIME between ? AND now() AND NAME LIKE replace("%'?'%",'''','')`;

  //  - ADD_TIME_FROM and ADD_TIME_TO and RECORD_NAME ✔
  if (
    options.length === 3 &&
    options.includes('ADD_TIME_FROM') &&
    options.includes('ADD_TIME_TO') &&
    options.includes('RECORD_NAME')
  )
    return `SELECT * FROM vw_lo_units WHERE ADD_TIME between ? AND ? AND NAME LIKE replace("%'?'%",'''','')`;

  // - TYPE and ADD_TIME_FROM and RECORD_NAME ✔
  if (
    options.length === 3 &&
    options.includes('TYPE') &&
    options.includes('ADD_TIME_FROM') &&
    options.includes('RECORD_NAME')
  )
    return `SELECT * FROM vw_lo_units WHERE TYPE = ? AND ADD_TIME  between  ? AND now() AND NAME LIKE replace("%'?'%",'''','')`;

  // - TYPE and ADD_TIME_FROM and ADD_TIME_TO ✔
  if (
    options.length === 3 &&
    options.includes('TYPE') &&
    options.includes('ADD_TIME_FROM') &&
    options.includes('ADD_TIME_TO')
  )
    return 'SELECT * FROM vw_lo_units WHERE TYPE = ? AND ADD_TIME BETWEEN ? AND ?;';

  // - TYPE and ADD_TIME_FROM and now() and RECORD_NAME ✔
  if (
    options.length === 3 &&
    options.includes('TYPE') &&
    options.includes('ADD_TIME_FROM') &&
    options.includes('RECORD_NAME')
  )
    return `SELECT * FROM vw_lo_units WHERE TYPE = ? AND ADD_TIME BETWEEN ? AND now() AND NAME LIKE replace("%'?'%",'''','');`;

  // - TYPE and ADD_TIME_FROM and ADD_TIME_TO and RECORD_NAME ✔
  if (
    options.length === 4 &&
    options.includes('TYPE') &&
    options.includes('ADD_TIME_FROM') &&
    options.includes('ADD_TIME_TO') &&
    options.includes('RECORD_NAME')
  )
    return `SELECT * FROM vw_lo_units WHERE TYPE = ? AND ADD_TIME BETWEEN ? AND ? AND NAME LIKE replace("%'?'%",'''','');`;

  return null;
};
export const addToResBundleAndLOUnit = async (newResBundleRow, newRecord) => {
  /**
   * @type {[[{  LANGUAGE_ID: number , MESSAGE_KEY: string, BUNDLE_KEY: string, MESSAGE_VALUE: string}]]}
   * @description array of array describe a new row(record) ready to be saved into the
   * resource_bundle table
   */
  await addToResBundle([newResBundleRow]);

  /**
   * @type { [[{NAME_KEY:string,UNIT_CODE:string, PARENT_ID:number|null, TYPE:number, OUID:number,IMAGE_VSID:string, ADDED_BY: number,UPDATED_BY:number ,ADD_TIME: Date,UPDATE_TIME: Date}]]}
   * @description  array of array describe a new record ready to be saved in the lo_unit table
   */

  await addToLoUnit([newRecord]);
};
