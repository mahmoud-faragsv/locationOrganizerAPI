import Joi from 'joi';
import JoiMessages from '../../../common/Joi.constant.js';
import CONSTANTS from '../../../common/messages.js';
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
  if (error)
    return next(
      new BadRequestErr(
        error.details[0].message,
        CONSTANTS.MSG.FAIL[req.langType]
      )
    );

  next();
});
export const validateGetLevelsQuery = catchAsyncErr(async (req, res, next) => {
  const schema = Joi.object({
    category: Joi.string()
      .trim()
      .required()
      // eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp(/^[^A-Za-z_]*$/))
      .messages(JoiMessages),
    lang: Joi.string()
      // eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp(/^[A-Za-z]*$/))
      .optional()
      .trim()
      .messages(JoiMessages)
  });
  const { error } = schema.validate(req.query);
  if (error)
    return next(
      new BadRequestErr(
        error.details[0].message,
        CONSTANTS.MSG.FAIL[req.langType]
      )
    );

  next();
});

export const validateLevelUpdate = (req, res, next) => {
  const schemaBody = Joi.object({
    newLevelName: Joi.string().optional().trim().min(1).messages(JoiMessages),
    newCustomProps: Joi.object({
      color: Joi.string()
        .trim()
        .min(7)
        .max(7)
        .required()
        // eslint-disable-next-line prefer-regex-literals
        .pattern(new RegExp(/^#/))
        .messages(JoiMessages)
    })
      .optional()
      .messages(JoiMessages)
  });

  const schemaQuery = Joi.object({
    lang: Joi.string()
      // eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp(/^[A-Za-z]*$/))
      .required()
      .trim()
      .messages(JoiMessages)
  });
  const { error } = schemaBody.validate(req.body);
  const { error: error2 } = schemaQuery.validate(req.query);
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

export const validateGetRecordsQuery = (req, res, next) => {
  const schemaQuery = Joi.object({
    sort: Joi.string()
      .trim()
      .optional()
      // eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp(/^\w+[,][-]?[1]{1}$/))
      .messages(JoiMessages),
    ouid: Joi.string()
      .trim()
      .required()
      // eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp(/^[^A-Za-z_]*$/))
      .messages(JoiMessages),
    lang: Joi.string().valid('Eng', 'Arab').trim().messages(JoiMessages)
  });

  const schemaParams = Joi.object({
    key: Joi.string()
      .trim()
      // eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp(/^msgk_[A-Za-z0-9]+/))
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

export const x = catchAsyncErr(async (req, res) => {});
