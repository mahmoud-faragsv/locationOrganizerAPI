import handleDevelopmentErrs from '../errors/handleDevelopment.error.js';
import handleProductionErrs from '../errors/handleProduction.error.js';

/**
 * -thanks to expressJS which provide a special route for handling our errors in one middleware
 * -Her we just make a centralized place to handle all our application errors.
 * -for decreasing debugging time we just creating a special error response(development Err)
 *  which contains all the error details that we may need to tackle certain bug quickly
 * -but production mood we need moore abstracted errs msg for the client rather than the
 *  development one so we designed it to achieve our gaol
 *
 */
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
