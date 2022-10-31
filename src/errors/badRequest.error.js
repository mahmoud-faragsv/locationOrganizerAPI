import { StatusCodes } from 'http-status-codes';
import OperationalErr from './operational.error.js';

export default class BadRequestErr extends OperationalErr {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.status = 'failed';
  }
}
