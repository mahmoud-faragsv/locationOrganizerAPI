export const languageQueries = {
  getLanTypeByName: ` SELECT ID FROM sverp.language  WHERE SHORT_LABEL LIKE ?;`,
  selectAllLanguages: 'SELECT ID, FULL_LABEL,SHORT_LABEL FROM sverp.language;'
};
export const bundleResourceQueries = {
  insert:
    'INSERT INTO RESOURCE_BUNDLE (LANGUAGE_ID, MESSAGE_KEY, BUNDLE_KEY, MESSAGE_VALUE) VALUES ?;',
  selectMessageKey:
    'SELECT MESSAGE_KEY FROM resource_bundle WHERE MESSAGE_VALUE = ?;',
  selectMsgValue:
    'SELECT MESSAGE_KEY, MESSAGE_VALUE FROM resource_bundle WHERE MESSAGE_VALUE =?;'
};
