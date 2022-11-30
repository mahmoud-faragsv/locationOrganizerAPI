/**
 * @function - building a dynamic slq query based on client search options(type, date)
 * @param {[string]} options - array of expected client query options
 * @returns { string| null} query  -   query | null
 */
export const buildSearchQuery = (options) => {
  if (options.length === 0) return null;
  if (options.length === 1 && options.includes('TYPE'))
    return 'SELECT * FROM vw_lo_units WHERE TYPE = ? ;';

  if (options.length === 1 && options.includes('ADD_TIME'))
    return 'SELECT * FROM vw_lo_units WHERE ADD_TIME between  ? AND ?;';
  if (
    options.length === 2 &&
    options.includes('TYPE') &&
    options.includes('ADD_TIME')
  )
    return 'SELECT * FROM vw_lo_units WHERE TYPE = ? AND ADD_TIME between  ? AND ? ;';
};
export const x = () => {};
