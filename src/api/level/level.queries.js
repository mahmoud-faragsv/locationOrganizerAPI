import { recordSortBy } from './level.utils.js';
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
  getWithUniqueKey: `SELECT * FROM ${DEV.DB_NAME}.look_up WHERE IS_ACTIVE = 1`,
  getUniqueKey: `SELECT UNIQUE_KEY FROM ${DEV.DB_NAME}.look_up WHERE ID = ?`,
  getLevelsSetIds: `SELECT ID, TITLE_KEY FROM look_up WHERE UNIQUE_KEY IN (?);`,
  updateTitleKeyAndCustomProps: `UPDATE ${DEV.DB_NAME}.look_up SET TITLE_KEY = ?, CUSTOM_PROPS = ? WHERE UNIQUE_KEY = ?;`,
  selectRootLevelType: `SELECT DISTINCT TITLE_KEY AS MESSAGE_VALUE FROM lo_unit AS u 
  JOIN look_up AS l WHERE u.PARENT_ID IS NULL AND  u.type = l.ID AND   u.OUID= ?; `
};

export const lookUpUnitQueries = {
  //Returns the ID and the name of the level and how many records it has
  getNumOfRecords: `SELECT ${DEV.DB_NAME}.look_up.ID, ${DEV.DB_NAME}.resource_bundle.MESSAGE_VALUE AS LEVEL_NAME, COUNT(${DEV.DB_NAME}.lo_unit.UNIT_CODE) AS NUMBER_OF_RECORDS
  FROM ${DEV.DB_NAME}.lo_unit 
  RIGHT JOIN ${DEV.DB_NAME}.look_up 
  ON ${DEV.DB_NAME}.lo_unit.type = ${DEV.DB_NAME}.look_up.id
  INNER JOIN ${DEV.DB_NAME}.resource_bundle 
  ON ${DEV.DB_NAME}.look_up.UNIQUE_KEY = ${DEV.DB_NAME}.resource_bundle.MESSAGE_KEY
  WHERE ${DEV.DB_NAME}.look_up.CATEGORY = ? AND IS_ACTIVE = 1 AND ${DEV.DB_NAME}.resource_bundle.LANGUAGE_ID = ?
  GROUP BY MESSAGE_VALUE ORDER BY ID ASC;`,

  selectAllLevelsIds: ` SELECT ID FROM look_up WHERE CATEGORY = ?`
};

export const typeValidationQueries = {
  insert: `INSERT INTO lo_type_validation (TYPE_ID, ALLOWED_CHILD_TYPE_ID) VALUES ?;`,
  selectAllAllowedChildrenIDs: `
  SELECT ALLOWED_CHILD_TYPE_ID
  FROM lo_type_validation
  WHERE TYPE_ID 
  IN(	
     SELECT ID 
      FROM look_up
      WHERE CATEGORY =?
     );
  `
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
    `,
  selectRootLevel: ` 
    SELECT * FROM resource_bundle
    WHERE MESSAGE_KEY =(
       SELECT UNIQUE_KEY 
              FROM look_up
              WHERE ID = ? ) AND LANGUAGE_ID = ?; 
    `,
  selectRootLevelType: `
      SELECT * FROM resource_bundle
      WHERE MESSAGE_KEY = (
      SELECT DISTINCT  UNIQUE_KEY FROM lo_unit AS u 
      JOIN look_up AS l WHERE u.PARENT_ID IS NULL AND  u.type = l.ID AND   u.OUID= ?) 
      AND LANGUAGE_ID= ?;
    `
};

export const loUnitQueries = {
  getAllRecordsAndSortIt: recordSortBy
};
