/* global Helpers */

const walletCtr = require('../../controllers/wallet');
const validator = require('../../middlewares/schemaValidations');
const auth = require('../../middlewares/auth');

module.exports = (router) => {
  router.post('/init', validator.initWallet, walletCtr.initWallet);
  router.post('/', auth.validateToken, walletCtr.enableWallet);
};
