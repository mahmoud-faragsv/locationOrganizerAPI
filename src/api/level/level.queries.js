/**
 * - The main goal of this module is to grouping all the possible queries(native-sql)
 *    which we may need it for interacting with the db from level route perspective.
 * - level.services is the only module which can consuming this module queries-objects
 */

export const lookUpQueries = {
  insert: `
     INSERT INTO LOOK_UP ( UNIQUE_KEY, CATEGORY, TITLE_KEY,PARENT_ID, CUSTOM_PROPS) VALUES ?;
    `,
  getLevelsSetIds: `SELECT ID, TITLE_KEY FROM look_up WHERE UNIQUE_KEY IN (?);`,
  updateTitleKeyAndCustomProps: `UPDATE sverp.look_up SET TITLE_KEY = ?, CUSTOM_PROPS = ? WHERE ID = ?`
};

// NOTE: add a condition which is OUID = ? after the modification of the schema
export const lookUpUnitQueries = {
  //Returns the ID and the name of the level and how many records it has
  getNumOfRecords: `SELECT sverp.look_up.ID, sverp.resource_bundle.MESSAGE_VALUE AS LEVEL_NAME, COUNT(sverp.lo_unit.UNIT_CODE) AS NUMBER_OF_RECORDS
  FROM sverp.lo_unit 
  RIGHT JOIN sverp.look_up 
  ON sverp.lo_unit.type = sverp.look_up.id
  INNER JOIN sverp.resource_bundle 
  ON sverp.look_up.UNIQUE_KEY = sverp.resource_bundle.MESSAGE_KEY
  WHERE sverp.look_up.CATEGORY = ? AND IS_ACTIVE = 1 AND sverp.resource_bundle.LANGUAGE_ID = ?
  GROUP BY MESSAGE_VALUE ORDER BY ID ASC;`
};

export const typeValidationQueries = {
  insert: `INSERT INTO LO_TYPE_VALIDATION (TYPE_ID, ALLOWED_CHILD_TYPE_ID) VALUES ?;`
};

export const resourceBundleQueries = {
  updateMessageValue: `UPDATE sverp.resource_bundle SET MESSAGE_VALUE = ? WHERE MESSAGE_KEY = ? AND LANGUAGE_ID = ?`
};
