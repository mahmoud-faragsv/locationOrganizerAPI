import BadRequestErr from './badRequest.error.js';

const handleDBValidation = (err, next) => {
  const errors = Object.values(err.errors)
    .map((errItem) => errItem.message)
    .join('. ');
  next(new BadRequestErr(errors));
};
export default handleDBValidation;
