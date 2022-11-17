import { StatusCodes } from 'http-status-codes';
import CONSTANTS from '../../common/messages.js';
import OperationalErr from './operational.error.js';

class NotFoundErr extends OperationalErr {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.status = CONSTANTS.MSG.FAIL;
  }
}

export default NotFoundErr;
