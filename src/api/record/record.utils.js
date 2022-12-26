import * as fs from 'fs';
// eslint-disable-next-line import/no-cycle
import { addToLoUnit } from './record.services.js';
import { addToResBundle } from '../../../common/shared.services.js';
/**
 * @function - building a dynamic slq query based on client search options(type, date)
 * @param {[string]} options - array of expected client query options
 * @returns { string| null} query  -   query | null
 */
export const buildSearchQuery = (options) => {
  if (options.length === 0) return null;
  if (options.length === 1 && options.includes('TYPE'))
    return 'SELECT * FROM vw_lo_units WHERE TYPE = ? ;';

  if (options.length === 1 && options.includes('ADD_TIME'))
    return 'SELECT * FROM vw_lo_units WHERE ADD_TIME between  ? AND ?;';
  if (
    options.length === 2 &&
    options.includes('TYPE') &&
    options.includes('ADD_TIME')
  )
    return 'SELECT * FROM vw_lo_units WHERE TYPE = ? AND ADD_TIME between  ? AND ? ;';
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

export const deleteImageInPublic = (code) => {
  const path = `./public/map-uploads/`;
  const regex = new RegExp(`map-${code}`);
  fs.readdirSync(path)
    .filter((f) => regex.test(f))
    .forEach((f) => fs.unlinkSync(path + f));
};
