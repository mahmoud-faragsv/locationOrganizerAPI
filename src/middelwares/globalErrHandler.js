import handleDevelopmentErrs from '../errors/handleDevelopment.error.js';
import handleProductionErrs from '../errors/handleProduction.error.js';

const globalErrHandler = (error, req, res, next) => {
  // console.error(error);
  if (process.env.NODE_ENV === 'development') {
    return handleDevelopmentErrs(res, error);
  }
  if (process.env.NODE_ENV === 'production') {
    handleProductionErrs(res, error);
  }
};
export default globalErrHandler;
