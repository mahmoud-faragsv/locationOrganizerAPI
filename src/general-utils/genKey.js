import { randomBytes } from 'crypto';

const genKey = (length) => randomBytes(length).toString('hex');

export default genKey;
