/* global Helpers */

const walletSrv = require('../services/wallet');
const jwtSrv = require('../services/jwtService');
const { walletDTO, depositDTO, withdrawalDTO } = require('../DTO/walletDTO');

module.exports = {
  initWallet: async (req, res) => {
    try {
      const {
        customer_xid: customerXid,
      } = req.body;

      const userId = await walletSrv.initWallet(customerXid);

      const token = jwtSrv.generateAccessToken({ userId });

      return Helpers.successResponse(
        res,
        201,
        { data: { token }, status: 'success' },
      );
    } catch (err) {
      return Helpers.errorResponse(res, null, err);
    }
  },
  enableWallet: async (req, res) => {
    try {
      const {
        userId,
      } = req;

      const wallet = await walletSrv.enableWallet(userId);

      return Helpers.successResponse(
        res,
        200,
        { data: { wallet: walletDTO(wallet) }, status: 'success' },
      );
    } catch (err) {
      return Helpers.errorResponse(res, null, err);
    }
  },
  disableWallet: async (req, res) => {
    try {
      const {
        userId,
      } = req;

      const wallet = await walletSrv.disableWallet(userId);

      return Helpers.successResponse(
        res,
        200,
        { data: { wallet: walletDTO(wallet) }, status: 'success' },
      );
    } catch (err) {
      return Helpers.errorResponse(res, null, err);
    }
  },
  viewBalance: async (req, res) => {
    try {
      const {
        userId,
      } = req;

      const wallet = await walletSrv.viewBalance(userId);

      return Helpers.successResponse(
        res,
        200,
        { data: { wallet: walletDTO(wallet) }, status: 'success' },
      );
    } catch (err) {
      return Helpers.errorResponse(res, null, err);
    }
  },
  depositFund: async (req, res) => {
    try {
      const {
        userId,
      } = req;

      const {
        reference_id: referenceId,
        amount,
      } = req.body;

      const result = await walletSrv.deposit(userId, referenceId, amount);

      return Helpers.successResponse(
        res,
        200,
        { data: { deposit: depositDTO({ ...result.dataValues, userId }) }, status: 'success' },
      );
    } catch (err) {
      return Helpers.errorResponse(res, null, err);
    }
  },
  expendFund: async (req, res) => {
    try {
      const {
        userId,
      } = req;

      const {
        reference_id: referenceId,
        amount,
      } = req.body;

      const result = await walletSrv.expend(userId, referenceId, amount);
      console.log(result);

      return Helpers.successResponse(
        res,
        200,
        { data: { withdrawal: withdrawalDTO({ ...result.dataValues, userId }) }, status: 'success' },
      );
    } catch (err) {
      return Helpers.errorResponse(res, null, err);
    }
  },
};
