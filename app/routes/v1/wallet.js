/* global Helpers */

const walletCtr = require('../../controllers/wallet');
const validator = require('../../middlewares/schemaValidations');
const auth = require('../../middlewares/auth');

module.exports = (router) => {
  router.post('/init', validator.initWallet, walletCtr.initWallet);
  router.post('/', auth.validateToken, walletCtr.enableWallet);
  router.patch('/', auth.validateToken, walletCtr.disableWallet);
  router.post('/deposits', validator.depositWallet, auth.validateToken, walletCtr.depositFund);
  router.post('/withdrawals', validator.expendWallet, auth.validateToken, walletCtr.expendFund);
  router.get('/', auth.validateToken, walletCtr.viewBalance);
};
