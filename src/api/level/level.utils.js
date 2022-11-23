import { genKey } from '../../general-utils/index.js';

/**
 * -the main goal of this module is to make Our code more clean, elegant, readable,
 *  and modularized
 * -so any function we may need to create to do some stuff related to level route...
 *  it will be her
 */
export const genLookUpBulk = (payload, bundleParams) => {
  const bulk = [];
  bundleParams.forEach((element, indx) => {
    bulk.push([
      element[1],
      1, // this value related to CATEGORY field, its mandatory so i just filled it with any integer till further notification
      element[3],
      null,
      { color: payload[indx].color }
    ]);
  });

  return bulk;
};

export const genBulkQueryParams = (LANGUAGE_ID, payload) => {
  const BUNDLE_KEY = process.env.USERS_DEFINED_BUNDLE_KEY;

  const bulk = [];
  payload.forEach((element) => {
    const MESSAGE_VALUE = element.type;
    const MESSAGE_KEY = genKey(+process.env.RES_BUNDLE_MESSAGE_KEY_SIZE);
    const record = [LANGUAGE_ID, MESSAGE_KEY, BUNDLE_KEY, MESSAGE_VALUE];
    bulk.push(record);
  });
  return bulk;
};
export const prepareLevelsIds = (arr) => {
  const messageKeys = [];
  arr.forEach((element) => {
    messageKeys.push(element[1]);
  });
  return messageKeys;
};

export const genBulkTypeValidation = (ids, payload) => {
  const bulk = [];
  payload.forEach((level) => {
    if (!level.parent.includes(null)) {
      const { ID: allowedChildId } = ids.find(
        (record) => record.TITLE_KEY === level.type
      );

      level.parent.forEach((parent) => {
        const { ID: ParentId } = ids.find(
          (record) => record.TITLE_KEY === parent
        );
        bulk.push([ParentId, allowedChildId]);
      });
    }
  });

  return bulk;
};
