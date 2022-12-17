import DEV from '../../config/environments.js';
/**
 * - The main goal of this module is to grouping all the possible queries(native-sql)
 *    which we may need it for interacting with the db from level route perspective.
 * - level.services is the only module which can consuming this module queries-objects
 */

export const lookUpQueries = {
  insert: `
     INSERT INTO look_up ( UNIQUE_KEY, CATEGORY, TITLE_KEY,PARENT_ID, CUSTOM_PROPS) VALUES ?;
    `,
  get: `SELECT * FROM ${DEV.DB_NAME}.look_up WHERE ID = ?`,
  getUniqueKey: `SELECT UNIQUE_KEY FROM ${DEV.DB_NAME}.look_up WHERE ID = ?`,
  getLevelsSetIds: `SELECT ID, TITLE_KEY FROM look_up WHERE UNIQUE_KEY IN (?);`,
  updateTitleKeyAndCustomProps: `UPDATE ${DEV.DB_NAME}.look_up SET TITLE_KEY = ?, CUSTOM_PROPS = ? WHERE ID = ?`,
  selectRootLevelType: `SELECT DISTINCT TITLE_KEY AS MESSAGE_VALUE FROM lo_unit AS u 
  JOIN look_up AS l WHERE u.PARENT_ID IS NULL AND  u.type = l.ID AND   u.OUID= ?; `
};

// NOTE: add a condition which is OUID = ? after the modification of the schema
export const lookUpUnitQueries = {
  //Returns the ID and the name of the level and how many records it has
  getNumOfRecords: `SELECT ${DEV.DB_NAME}.look_up.ID, ${DEV.DB_NAME}.resource_bundle.MESSAGE_VALUE AS LEVEL_NAME, COUNT(${DEV.DB_NAME}.lo_unit.UNIT_CODE) AS NUMBER_OF_RECORDS
  FROM ${DEV.DB_NAME}.lo_unit 
  RIGHT JOIN ${DEV.DB_NAME}.look_up 
  ON ${DEV.DB_NAME}.lo_unit.type = ${DEV.DB_NAME}.look_up.id
  INNER JOIN ${DEV.DB_NAME}.resource_bundle 
  ON ${DEV.DB_NAME}.look_up.UNIQUE_KEY = ${DEV.DB_NAME}.resource_bundle.MESSAGE_KEY
  WHERE ${DEV.DB_NAME}.look_up.CATEGORY = ? AND IS_ACTIVE = 1 AND ${DEV.DB_NAME}.resource_bundle.LANGUAGE_ID = ?
  GROUP BY MESSAGE_VALUE ORDER BY ID ASC;`
};

export const typeValidationQueries = {
  insert: `INSERT INTO lo_type_validation (TYPE_ID, ALLOWED_CHILD_TYPE_ID) VALUES ?;`
};

export const resourceBundleQueries = {
  updateMessageValue: `UPDATE ${DEV.DB_NAME}.resource_bundle SET MESSAGE_VALUE = ? WHERE MESSAGE_KEY = ? and LANGUAGE_ID = ?`,
  selectLevelsByLangAndCategory: `
      SELECT LANGUAGE_ID ,MESSAGE_VALUE
      FROM resource_bundle
      WHERE MESSAGE_KEY 
      IN(	
          SELECT UNIQUE_KEY 
          FROM look_up
          WHERE CATEGORY =(?) 
         ) AND LANGUAGE_ID=(?) ;
    `
};
