import DEV from '../src/config/environments.js';

export const languageQueries = {
  getLanTypeByName: ` SELECT ID FROM ${DEV.DB_NAME}.language  WHERE SHORT_LABEL LIKE ?;`,
  selectAllLanguages: `select ID, FULL_LABEL,SHORT_LABEL, name FROM ${DEV.DB_NAME}.language;`
};
export const bundleResourceQueries = {
  insert:
    'INSERT INTO resource_bundle (LANGUAGE_ID, MESSAGE_KEY, BUNDLE_KEY, MESSAGE_VALUE) VALUES ?;',
  selectMessageKey:
    'SELECT MESSAGE_KEY FROM resource_bundle WHERE MESSAGE_VALUE = ?;',
  selectMsgValue:
    'SELECT MESSAGE_KEY, MESSAGE_VALUE FROM resource_bundle WHERE MESSAGE_VALUE =?;',
  selectLevelsByLangAndCategory: `
    SELECT *
    FROM resource_bundle
    WHERE MESSAGE_KEY 
    IN(	
        SELECT UNIQUE_KEY 
        FROM look_up
        WHERE CATEGORY =(?) 
       ) AND LANGUAGE_ID=(?) ;
  `
};

export const LookUpQueries = {
  get: `SELECT ID, TITLE_KEY, PARENT_ID, CUSTOM_PROPS FROM sverp.look_up WHERE ID = ?`
};
