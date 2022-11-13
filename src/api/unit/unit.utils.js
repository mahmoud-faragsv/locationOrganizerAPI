import { genKey } from '../../general-utils/index.js';

/**
 * -the main goal of this module is to make Our code more clean, elegant, readable,
 *  and modularized
 * -so any function we may need to create to do some stuff related to unit route... it will be her
 */
export const genLookUpBulk = (payload, bundleParams) => {
  const bulk = [];
  bundleParams.forEach((element, indx) => {
    bulk.push([
      element[1],
      2, // this value related to CATEGORY field, its mandatory so i just filled it with any integer till further notification
      element[3],
      null,
      { color: payload[indx].color }
    ]);
  });

  return bulk;
};

export const genBulkQueryParams = (langID, payload) => {
  const LANGUAGE_ID = langID;
  const BUNDLE_KEY = process.env.USERS_DEFINED_BUNDLE_KEY; // USERS_DEFINED_BUNDLE_KEY=USERS_DEFINED

  const bulk = [];
  payload.forEach((element) => {
    const MESSAGE_VALUE = element.type;
    const MESSAGE_KEY = `msgk_${genKey(
      process.env.RES_BUNDLE_MESSAGE_KEY_SIZE //  RES_BUNDLE_MESSAGE_KEY_SIZE = 8
    )}`;
    const record = [LANGUAGE_ID, MESSAGE_KEY, BUNDLE_KEY, MESSAGE_VALUE];
    bulk.push(record);
  });
  return bulk;
};
export const prepareUnitsIds = (arr) => {
  const messageKeys = [];
  // const levelsTypes = [];
  arr.forEach((element) => {
    messageKeys.push(element[1]);
    // levelsTypes.push([element[1], element[3]]);
  });
  return messageKeys;
};

// export const addIdsToMsgTypes = (resIds, levelsTypes) => {
//   const idsOnly = resIds[0];
//   levelsTypes.forEach((element, indx) => {
//     element.push(idsOnly[indx].ID);
//   });
// };
export const genBulkTypeValidation = (ids, payload) => {
  const bulk = [];
  payload.forEach((unit) => {
    if (unit.parent !== null) {
      const { ID: allowedChildId } = ids.find(
        (record) => record.TITLE_KEY === unit.type
      );

      unit.parent.forEach((parent) => {
        const { ID: ParentId } = ids.find(
          (record) => record.TITLE_KEY === parent
        );
        bulk.push([ParentId, allowedChildId]);
      });
    }
  });

  return bulk;
};
