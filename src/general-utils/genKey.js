import { randomBytes } from 'crypto';

/**
 * @function - a factory func responsible for  generating random key with specific length
 * @param {number} length - describe the length of the key
 * @returns {string}  the generated key is a string value
 */
const genKey = (length) => `msgk_${randomBytes(length).toString('hex')}`;

export default genKey;
