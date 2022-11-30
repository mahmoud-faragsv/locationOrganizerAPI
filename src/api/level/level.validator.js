import Joi from 'joi';
import JoiMessages from '../../../common/Joi.constant.js';
import BadRequestErr from '../../errors/badRequest.error.js';
import { catchAsyncErr } from '../../general-utils/index.js';

// Her we will validate the incoming client request in the real time state
// We will use Joi our main 3th-party module to help us on this process

export const validateLevelsInputs = catchAsyncErr(async (req, res, next) => {
  const schema = Joi.object({
    lang: Joi.string().trim().required().messages(JoiMessages),
    payload: Joi.array()
      .items(
        Joi.object({
          type: Joi.string().trim().required().messages(JoiMessages),
          parent: Joi.array()
            .items(Joi.string().allow(null))
            .required()

            .messages(JoiMessages),
          color: Joi.string()
            .trim()
            .min(7)
            .max(7)
            .required()
            // eslint-disable-next-line prefer-regex-literals
            .pattern(new RegExp(/^#/))
            .messages(JoiMessages)
        })
      )
      .required()
      .messages(JoiMessages)
  });
  const { error } = schema.validate(req.body);
  if (error) return next(new BadRequestErr(error.details[0].message));

  next();
});

export const validateLevelUpdate = catchAsyncErr(async (req, res, next) => {
  const schema = Joi.object({
    newLevelName: Joi.string().min(1).messages(JoiMessages),
    newCustomProps: Joi.object({
      color: Joi.string().required().min(0).max(16).messages(JoiMessages)
    }).messages(JoiMessages)
  });
  const { error } = schema.validate(req.body);
  if (error) return next(new BadRequestErr(error.details[0].message));

  next();
});

export const x = catchAsyncErr(async (req, res) => {});
