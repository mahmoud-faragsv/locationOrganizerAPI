import { Query } from '../../config/connection.js';
import languageQueries from './language.queries.js';

export const getAllLanguages = () => {
  console.log('Inside record.service.updateCodeAndImage function');
  console.log(
    `languageQueries.selectAllLanguages =  ${languageQueries.selectAllLanguages}`
  );
  console.log(`query parameters = `);

  return Query(languageQueries.selectAllLanguages);
};

export const x = () => '';
