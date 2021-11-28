/* global Helpers */
const Joi = require('joi');

const initWallet = (req, _res, next) => {
  const { body } = req;

  console.log('body:', body);

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

module.exports = {
  initWallet,
};
