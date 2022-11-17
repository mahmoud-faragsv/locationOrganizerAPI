/**
 * - The main goal of this module is to grouping all the possible queries(native-sql)
 *    which we may need it for interacting with the db from level route perspective.
 * - level.services is the only module which can consuming this module queries-objects
 */

export const lookUpQueries = {
  insert: `
     INSERT INTO LOOK_UP ( UNIQUE_KEY, CATEGORY, TITLE_KEY,PARENT_ID, CUSTOM_PROPS) VALUES ?;
    `,
  getLevelsSetIds: `SELECT ID, TITLE_KEY FROM look_up WHERE UNIQUE_KEY IN (?);`
};

export const typeValidationQueries = {
  insert: `INSERT INTO LO_TYPE_VALIDATION (TYPE_ID, ALLOWED_CHILD_TYPE_ID) VALUES ?;`
};
