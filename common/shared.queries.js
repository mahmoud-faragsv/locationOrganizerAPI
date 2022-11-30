export const languageQueries = {
  getLanTypeByName: `SELECT ID FROM LANGUAGE  WHERE SHORT_LABEL LIKE ?;`,
  selectAllLanguages: 'SELECT ID, FULL_LABEL,SHORT_LABEL FROM language;'
};
export const bundleResourceQueries = {
  insert:
    'INSERT INTO RESOURCE_BUNDLE (LANGUAGE_ID, MESSAGE_KEY, BUNDLE_KEY, MESSAGE_VALUE) VALUES ?;',
  selectMessageKey:
    'SELECT MESSAGE_KEY FROM resource_bundle WHERE MESSAGE_VALUE = ?;',
  selectMsgValue:
    'SELECT MESSAGE_KEY, MESSAGE_VALUE FROM resource_bundle WHERE MESSAGE_VALUE =?;'
};

export const commonLookUpQueries = {
  get: `SELECT ID, TITLE_KEY, PARENT_ID, CUSTOM_PROPS FROM sverp.look_up WHERE ID = ?`
};
