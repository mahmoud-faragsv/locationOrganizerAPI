import { StatusCodes } from 'http-status-codes';
import CONSTANTS from '../../common/messages.js';
import OperationalErr from './operational.error.js';

export default class BadRequestErr extends OperationalErr {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.status = CONSTANTS.MSG.FAIL;
  }
}
