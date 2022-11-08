import { genKey } from '../../general-utils/index.js';

export const genLookUpBulk = (payload, bundleParams) => {
  const nestedArr = [];
  bundleParams.forEach((element, indx) => {
    nestedArr.push([
      element[1],
      2, // this value related to CATEGORY field, its mandatory so i just filled it with any integer till further notification
      element[3],
      null,
      { color: payload[indx].color }
    ]);
  });

  return nestedArr;
};

export const genBulkQueryParams = (langID, payload) => {
  const LANGUAGE_ID = langID;
  const BUNDLE_KEY = 'USERS_DEFINED';

  const bulk = [];
  const msgSize = 4;
  payload.forEach((element) => {
    const MESSAGE_VALUE = element.type;
    const MESSAGE_KEY = `msgk_${genKey(msgSize)}`;
    const record = [LANGUAGE_ID, MESSAGE_KEY, BUNDLE_KEY, MESSAGE_VALUE];
    bulk.push(record);
  });
  return bulk;
};
export const handleUnitsIds = (arr) => {
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
