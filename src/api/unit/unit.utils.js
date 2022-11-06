import { genKey } from '../../general-utils/index.js';

export const createNestedArr = (payload) => {
  const nestedArr = [];
  payload.forEach((element) => {
    nestedArr.push(Object.values(element));
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
