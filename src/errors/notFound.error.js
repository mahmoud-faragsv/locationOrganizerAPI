import { StatusCodes } from 'http-status-codes';
import OperationalErr from './operational.error.js';

class NotFoundErr extends OperationalErr {
  constructor(message, status) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.status = status;
  }
}

export default NotFoundErr;
