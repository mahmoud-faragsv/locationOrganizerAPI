/**
 * -the main goal of this module is to make Our code more clean, elegant, readable,
 *  and modularized
 * -so any function we may need to create to do some stuff related to level route...
 *  it will be her
 */
import { genKey } from '../../general-utils/index.js';

/**
 *
 * @param {[{type:string, parent:[string | null], color: string}]} payload -
 * array of objects describe the  inserted client levels
 * @param {[[LANGUAGE_ID: number, MESSAGE_KEY: string, BUNDLE_KEY: string, MESSAGE_VALUE: string]]} bulkOfLevels- this array describe the bulk which needed to be saved in the db
 *  , we need it her as we need  to extract the message_key to stored into the lookup table instead of the
 * original values which stored previously in the resource-bundle
 * @returns {[[UNIQUE_KEY: string,CATEGORY: number, TITLE_KEY: string, PARENT_ID:number: CUSTOM_PROPS:{ color:string}]]} array of arrays(levels) which will be  inserted into the lookup table as a
 * bulk(group of levels in one query) only in one time(single db access)
 */
export const genLookUpBulk = (payload, bulkOfLevels) => {
  const bulk = [];
  bulkOfLevels.forEach((element, indx) => {
    bulk.push([
      element[1],
      1, // this value related to CATEGORY field, its mandatory so i just filled it with any integer till further notification
      element[3],
      null,
      { color: payload[indx].color }
    ]);
  });

  return bulk;
};

/**
 * @function -  a bulk factory which a group of records to inserted once on
 * resource-bundle based on client inputs
 * @param {number} LANGUAGE_ID - language Id coming from db
 * @param {[{type:string, parent:[string | null], color: string}]} payload - array of objects
 * describe the  inserted client levels
 * @returns {[[LANGUAGE_ID: number, MESSAGE_KEY: string, BUNDLE_KEY: string, MESSAGE_VALUE: string]]}  array of array each  record(array inside the array) define a db record
 */
export const genResourceBundleBulk = (LANGUAGE_ID, payload) => {
  // any value coming from the client considered as user-defined data which reflected in the db as bundle_key= USERS_DEFINED
  const BUNDLE_KEY = process.env.USERS_DEFINED_BUNDLE_KEY;

  const bulk = [];
  // looping through client inputs (levels) and build array of array contains all expected levels to stored  once in the db
  payload.forEach((element) => {
    const MESSAGE_VALUE = element.type;
    const MESSAGE_KEY = genKey(+process.env.RES_BUNDLE_MESSAGE_KEY_SIZE);
    const record = [LANGUAGE_ID, MESSAGE_KEY, BUNDLE_KEY, MESSAGE_VALUE];
    bulk.push(record);
  });
  return bulk;
};
/**
 *@function  responsible for returning an array of levels message keys from the group of levels
 * @param {[[LANGUAGE_ID: number, MESSAGE_KEY: string, BUNDLE_KEY: string,MESSAGE_VALUE: string]]} bulkOfLevels -
 * array of array (levels) each level describe a row in the resource bundle table
 * @returns {[string]}  array of message keys - example ['msgk_njvno3jenrfe3','msgk_fjdvhfi3uhriuhf']
 */
export const extractMessageKeys = (bulkOfLevels) => {
  const messageKeys = [];
  bulkOfLevels.forEach((element) => {
    messageKeys.push(element[1]);
  });
  return messageKeys;
};
/**
 * @function  responsible for generating a bulk(group of rows to access db only once) of type_validation
 *  table rows.
 * @param {[{ID:number,TITLE_KEY: string }]} levelsIDs array of objects holds the levels IDs and its TITLE_Key
 * @param {[{type:string, parent:[string | null], color: string}]} payload - array of objects
 * describe the  inserted client levels
 * @returns {[[{TYPE_ID: number, ALLOWED_CHILD_TYPE_ID: number}]]} - array of type_validations
 */
export const genBulkTypeValidation = (levelsIDs, payload) => {
  const bulk = [];
  payload.forEach((level) => {
    if (!level.parent.includes(null)) {
      const { ID: allowedChildId } = levelsIDs.find(
        (record) => record.TITLE_KEY === level.type
      );

      level.parent.forEach((parent) => {
        const { ID: ParentId } = levelsIDs.find(
          (record) => record.TITLE_KEY === parent
        );
        bulk.push([ParentId, allowedChildId]);
      });
    }
  });

  return bulk;
};

export const filterRootLevelId = (levelsId, allowedChildIds) => {
  const allLevelsId = [];
  const childIds = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const item of levelsId) {
    allLevelsId.push(item.ID);
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const item of allowedChildIds) {
    childIds.push(item.ALLOWED_CHILD_TYPE_ID);
  }

  let rootId = null;
  allLevelsId.forEach((id) => {
    if (!childIds.includes(id)) {
      rootId = id;
    }
  });
  return rootId;
};

export const recordSortBy = (sortType) => {
  sortType = sortType.split(',');
  const columnName = sortType[0].toUpperCase();
  if (sortType[1] === '-1')
    return `SELECT parent.ID, parent.UNIT_CODE AS RECORD_CODE, resource_bundle.MESSAGE_VALUE AS RECORD_NAME, DATE_FORMAT(parent.ADD_TIME, '%d/%m/%Y') AS CREATED_DATE, COUNT(units.ID) AS NUMBER_OF_CHILDREN FROM lo_unit AS units 
    RIGHT JOIN lo_unit AS parent ON parent.ID = units.PARENT_ID 
    LEFT JOIN resource_bundle 
    ON parent.NAME_KEY = resource_bundle.MESSAGE_KEY 
    WHERE parent.TYPE = ? AND resource_bundle.LANGUAGE_ID = ? AND parent.OUID = ? 
    GROUP BY parent.ID 
    ORDER BY ${columnName} DESC;`;
  if (sortType[1] === '1')
    return `SELECT parent.ID, parent.UNIT_CODE AS RECORD_CODE, resource_bundle.MESSAGE_VALUE AS RECORD_NAME, DATE_FORMAT(parent.ADD_TIME, '%d/%m/%Y') AS CREATED_DATE, COUNT(units.ID) AS NUMBER_OF_CHILDREN FROM lo_unit AS units 
    RIGHT JOIN lo_unit AS parent ON parent.ID = units.PARENT_ID 
    LEFT JOIN resource_bundle 
    ON parent.NAME_KEY = resource_bundle.MESSAGE_KEY 
    WHERE parent.TYPE = ? AND resource_bundle.LANGUAGE_ID = ? AND parent.OUID = ? 
    GROUP BY parent.ID 
    ORDER BY ${columnName} ASC;`;
};
