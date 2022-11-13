export const languageQueries = {
  getLanTypeByName: `SELECT ID FROM LANGUAGE  WHERE SHORT_LABEL LIKE ?;`
};
export const bundleResourceQueries = {
  insert:
    'INSERT INTO RESOURCE_BUNDLE (LANGUAGE_ID, MESSAGE_KEY, BUNDLE_KEY, MESSAGE_VALUE) VALUES ?;'
};
