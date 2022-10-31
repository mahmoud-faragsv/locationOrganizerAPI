import OperationalErr from './operational.error.js';

const handleDevelopmentErrs = (res, error) => {
  if (error instanceof OperationalErr) {
    return res.status(error.statusCode).json({
      status: error.status,
      error,
      errStack: error.stack,
      message: error.message
    });
  }
  res.status(500).json({
    status: 'error',
    error,
    errStack: error.stack,
    message: error.message
  });
};

export default handleDevelopmentErrs;
