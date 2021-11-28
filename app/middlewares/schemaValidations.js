/* global Helpers */
const Joi = require('joi');

const initWallet = (req, _res, next) => {
  const { body } = req;

  const validateRes = Joi.object({
    customer_xid: Joi.string().guid().required(),
  }).validate(body);

  if (validateRes.error) {
    throw ({
      status: Helpers.constant.httpStatus.badRequest,
      message: Helpers.constant.messages.badRequest,
      error: validateRes.error.details,
    });
  }

  return next();
};

const depositWallet = (req, _res, next) => {
  const { body } = req;

  const validateRes = Joi.object({
    amount: Joi.number().required(),
    reference_id: Joi.string().guid().required(),
  }).validate(body);

  if (validateRes.error) {
    throw ({
      status: Helpers.constant.httpStatus.badRequest,
      message: Helpers.constant.messages.badRequest,
      error: validateRes.error.details,
    });
  }

  return next();
};

const expendWallet = (req, _res, next) => {
  const { body } = req;

  const validateRes = Joi.object({
    amount: Joi.number().required(),
    reference_id: Joi.string().guid().required(),
  }).validate(body);

  if (validateRes.error) {
    throw ({
      status: Helpers.constant.httpStatus.badRequest,
      message: Helpers.constant.messages.badRequest,
      error: validateRes.error.details,
    });
  }

  return next();
};

module.exports = {
  initWallet,
  depositWallet,
  expendWallet,
};
