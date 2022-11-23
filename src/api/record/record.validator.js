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
