/* global Helpers */

const walletSrv = require('../services/wallet');
const jwtSrv = require('../services/jwtService');
const { walletDTO } = require('../DTO/walletDTO');

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
};
