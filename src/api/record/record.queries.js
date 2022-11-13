export const loUnitQueries = {
  insert: `INSERT INTO LO_UNIT (NAME_KEY,RECORD_CODE, PARENT_ID, TYPE, OUID,IMAGE_VSID, ADDED_BY,UPDATED_BY,ADD_TIME,UPDATE_TIME)
  VALUES ?;`
};
export const typeValidationQueries = {
  selectParentId: `SELECT DISTINCT(t1.TYPE_ID) FROM LO_TYPE_VALIDATION t1  
  LEFT JOIN LO_TYPE_VALIDATION t2 
  ON t1.TYPE_ID = t2.ALLOWED_CHILD_TYPE_ID
  WHERE t2.TYPE_ID IS NULL;  `
};

export const lookUpQueries = {
  selectId: ` SELECT ID FROM look_up WHERE TITLE_KEY = ?;
  `
};
