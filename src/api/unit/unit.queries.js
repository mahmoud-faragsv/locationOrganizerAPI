export const lookUpQueries = {
  insert: `
     INSERT INTO LOOK_UP (PARENT_ID, UNIQUE_KEY, CATEGORY, TITLE_KEY, CUSTOM_PROPS) VALUES ?;
    `
};
export const bundleResourceQueries = {
  insert:
    'INSERT INTO RESOURCE_BUNDLE (LANGUAGE_ID, MESSAGE_KEY, BUNDLE_KEY, MESSAGE_VALUE) VALUES ?;'
};

export const languageQueries = {
  getLanTypeByName: `SELECT ID FROM LANGUAGE  WHERE SHORT_LABEL LIKE ?;`
};
