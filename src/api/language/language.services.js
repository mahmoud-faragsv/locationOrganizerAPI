import { Query } from '../../config/db.js';
import languageQueries from './language.queries.js';

export const getAllLanguages = () => Query(languageQueries.selectAllLanguages);
export const x = () => '';
