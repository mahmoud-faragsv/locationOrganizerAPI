import { randomBytes } from 'crypto';

const genKey = (length) => `msgk_${randomBytes(length).toString('hex')}`;

export default genKey;
