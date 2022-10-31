import OperationalErr from './operational.error.js';

const handleProductionErrs = (res, error) => {
  if (error.name === 'CastError')
    error.message = `invalid ${error.path}: ${error.value}`; // mutate the message with a readable one only in production

  if (error instanceof OperationalErr) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message
    });
  }
  res.status(500).json({ status: 'error', message: 'Something went wrong' });
};
export default handleProductionErrs;
