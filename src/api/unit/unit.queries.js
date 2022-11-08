export const lookUpQueries = {
  insert: `
     INSERT INTO LOOK_UP ( UNIQUE_KEY, CATEGORY, TITLE_KEY,PARENT_ID, CUSTOM_PROPS) VALUES ?;
    `,
  getLevelsSetIds: `SELECT ID, TITLE_KEY FROM look_up WHERE UNIQUE_KEY IN (?);`
};
export const bundleResourceQueries = {
  insert:
    'INSERT INTO RESOURCE_BUNDLE (LANGUAGE_ID, MESSAGE_KEY, BUNDLE_KEY, MESSAGE_VALUE) VALUES ?;'
};

export const languageQueries = {
  getLanTypeByName: `SELECT ID FROM LANGUAGE  WHERE SHORT_LABEL LIKE ?;`
};

export const typeValidationQueries = {
  insert: `INSERT INTO LO_TYPE_VALIDATION (TYPE_ID, ALLOWED_CHILD_TYPE_ID) VALUES ?;`
};
