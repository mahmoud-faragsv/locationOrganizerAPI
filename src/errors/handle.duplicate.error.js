import BadRequestErr from './badRequest.error.js';

const handleDuplicateKeyErr = (err, next) => {
  const ErrKeyName = Object.entries(err.keyValue)[0][0];
  const ErrValue = Object.entries(err.keyValue)[0][1];
  next(
    new BadRequestErr(
      ` '${ErrKeyName}' : '${ErrValue}'... is duplicated,unique only`
    )
  );
};

export default handleDuplicateKeyErr;
