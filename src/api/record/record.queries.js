import { buildSearchQuery } from './record.utils.js';

export const loUnitQueries = {
  insert: `INSERT INTO lo_unit (NAME_KEY,UNIT_CODE, PARENT_ID, TYPE, OUID,IMAGE_VSID, ADDED_BY,UPDATED_BY,ADD_TIME,UPDATE_TIME)
  VALUES ?;`,
  selectIdByUnitCode: `SELECT ID FROM lo_unit WHERE UNIT_CODE= ? ;
  `,
  selectUnitCode: ' SELECT UNIT_CODE FROM lo_unit WHERE UNIT_CODE=?;',
  updateMapImage: ` UPDATE lo_unit SET IMAGE_VSID = ? WHERE UNIT_CODE = ?;`
};
export const typeValidationQueries = {
  selectParentId: `SELECT DISTINCT(t1.TYPE_ID) FROM lo_type_validation t1  
  LEFT JOIN lo_type_validation t2 
  ON t1.TYPE_ID = t2.ALLOWED_CHILD_TYPE_ID
  WHERE t2.TYPE_ID IS NULL;  `
};

export const lookUpQueries = {
  selectId: ` SELECT ID FROM look_up WHERE UNIQUE_KEY = ?;
  `
};

export const ViewsQueries = {
  select_from_vw_lo_units: buildSearchQuery
};
