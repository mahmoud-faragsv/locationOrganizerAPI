import Joi from 'joi';
import JoiMessages from '../../../common/Joi.constant.js';
import CONSTANTS from '../../../common/messages.js';
import BadRequestErr from '../../errors/badRequest.error.js';

let schema;
export const ValidateRootReq = (req, res, next) => {
  schema = Joi.object({
    unitData: Joi.object({
      unitName: Joi.string().trim().required().messages(JoiMessages),
      unitCode: Joi.string().trim().required().messages(JoiMessages)
    })
      .required()
      .messages(JoiMessages),
    lang: Joi.string().trim().required().messages(JoiMessages)
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return next(
      new BadRequestErr(
        error.details[0].message,
        CONSTANTS.MSG.FAIL[req.langType]
      )
    );
  }

  next();
};

export const ValidateChildReq = (req, res, next) => {
  schema = Joi.object({
    unitData: Joi.object({
      unitName: Joi.string().trim().required().messages(JoiMessages),
      unitCode: Joi.string().trim().required().messages(JoiMessages),
      unitType: Joi.string().trim().required().messages(JoiMessages),
      unitParentCode: Joi.string().trim().required().messages(JoiMessages)
    }),
    lang: Joi.string().trim().required().messages(JoiMessages)
  });
  const { error } = schema.validate(req.body);
  // console.log(error);
  if (error)
    return next(
      new BadRequestErr(
        error.details[0].message,
        CONSTANTS.MSG.FAIL[req.langType]
      )
    );

  next();
};

export const validateGetRecordQuery = (req, res, next) => {
  const schemaQuery = Joi.object({
    ouid: Joi.string()
      .trim()
      .required()
      // eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp(/^[^A-Za-z_]*$/))
      .messages(JoiMessages),
    lang: Joi.string()
      // eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp(/^[A-Za-z]*$/))
      .trim()
      .messages(JoiMessages)
  });

  const schemaParams = Joi.object({
    code: Joi.string()
      .trim()
      // eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp(/^[A-Za-z0-9]*$/))
      .required()
      .messages(JoiMessages)
  });
  const { error } = schemaQuery.validate(req.query);
  const { error: error2 } = schemaParams.validate(req.params);
  // console.log(error);
  if (error)
    return next(
      new BadRequestErr(
        error.details[0].message,
        CONSTANTS.MSG.FAIL[req.langType]
      )
    );
  if (error2)
    return next(
      new BadRequestErr(
        error2.details[0].message,
        CONSTANTS.MSG.FAIL[req.langType]
      )
    );

  next();
};

export const validateRecordUpdate = (req, res, next) => {
  const schemaBody = Joi.object({
    newRecordName: Joi.string().trim().message(JoiMessages),
    newUnitCode: Joi.string().trim().message(JoiMessages)
  });

  const schemaQuery = Joi.object({
    ouid: Joi.string()
      .trim()
      .required()
      // eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp(/^[^A-Za-z_]*$/))
      .messages(JoiMessages),
    lang: Joi.string()
      // eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp(/^[A-Za-z]*$/))
      .trim()
      .messages(JoiMessages)
  });

  const schemaParams = Joi.object({
    code: Joi.string()
      .trim()
      // eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp(/^[A-Za-z0-9]*$/))
      .required()
      .messages(JoiMessages)
  });

  const { error } = schemaQuery.validate(req.query);
  const { error: error2 } = schemaParams.validate(req.params);
  const { error: error3 } = schemaBody.validate(req.body);
  // console.log(error);
  if (error)
    return next(
      new BadRequestErr(
        error.details[0].message,
        CONSTANTS.MSG.FAIL[req.langType]
      )
    );
  if (error2)
    return next(
      new BadRequestErr(
        error2.details[0].message,
        CONSTANTS.MSG.FAIL[req.langType]
      )
    );
  if (error3)
    return next(
      new BadRequestErr(
        error3.details[0].message,
        CONSTANTS.MSG.FAIL[req.langType]
      )
    );

  next();
};
