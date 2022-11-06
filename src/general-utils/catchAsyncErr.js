import handleDuplicateKeyErr from '../errors/handle.duplicate.error.js';
import handleDBValidation from '../errors/handleDBValidation.error.js';

const catchAsyncErr = (func) => (req, res, next) => {
  func(req, res, next).catch((err) => {
    if (err.code === 11000) return handleDuplicateKeyErr(err, next);
    if (err.name === 'ValidationError') return handleDBValidation(err, next);
    next(err);
  }); // passing the error object into the next to  trigger the global error meddileware
};

export default catchAsyncErr;
