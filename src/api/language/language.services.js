/* eslint-disable prettier/prettier */
import { Query } from '../../config/connection.js';
import languageQueries from './language.queries.js';

export const getAllLanguages = () => {
  console.log('Inside record.service.updateCodeAndImage function');

  console.log('languageQueries.selectAllLanguages:', languageQueries.selectAllLanguages);
  console.log('params:')

  return Query(languageQueries.selectAllLanguages);
};

export const x = () => '';
