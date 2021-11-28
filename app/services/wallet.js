const { sequelize } = require('../db/models');

const mutationCommonAction = require('./commonAction')('Mutation');
const userCommonAction = require('./commonAction')('User');
const walletCommonAction = require('./commonAction')('Wallet');

const { walletStatusEnum, errorMessage, mutationTypeEnum } = require('../helpers/enum');
const { ErrorWithStatusCode } = require('../helpers/error');

module.exports = {
  initWallet: async (customerXid) => {
    const transaction = await sequelize.transaction();
    try {
      const existingUser = await userCommonAction.findOne({ id: customerXid });
      if (existingUser) {
        return existingUser.id;
      }

      const [createdUser] = await Promise.all([
        userCommonAction.create({ id: customerXid }, transaction),
        walletCommonAction.create({ owner_id: customerXid }, transaction),
      ]);

      await transaction.commit();
      return createdUser.id;
    } catch (error) {
      transaction.rollback();
      throw (error);
    }
  },
  enableWallet: async (userId) => {
    const [existingUser] = await walletCommonAction.update(
      { ownerId: userId, status: walletStatusEnum.DISABLED },
      {
        status: walletStatusEnum.ENABLED,
        enabledAt: new Date(),
      },
    );
    if (!existingUser) {
      throw new ErrorWithStatusCode(errorMessage.WALLET_ENABLED, 422);
    }
    const wallet = await walletCommonAction
      .findOne({ ownerId: userId, status: walletStatusEnum.ENABLED });

    return wallet;
  },
  disableWallet: async (userId) => {
    const [existingUser] = await walletCommonAction.update(
      { ownerId: userId, status: walletStatusEnum.ENABLED },
      {
        status: walletStatusEnum.ENABLED,
        enabledAt: new Date(),
      },
    );
    if (!existingUser) {
      throw new ErrorWithStatusCode(errorMessage.WALLET_DISABLED, 422);
    }
    const wallet = await walletCommonAction
      .findOne({ ownerId: userId, status: walletStatusEnum.DISABLED });

    return wallet;
  },
  viewBalance: async (userId) => {
    const wallet = await walletCommonAction
      .findOne({ ownerId: userId });

    if (!wallet || wallet.status === walletStatusEnum.DISABLED) {
      throw new ErrorWithStatusCode(errorMessage.WALLET_DISABLED, 401);
    }

    return wallet;
  },
  depositMoney: async (userId, referenceId, amount) => {
    const transaction = await sequelize.transaction();
    try {
      const [wallet, duplicateMutation] = await Promise.all([
        walletCommonAction
          .findOne({ ownerId: userId }),
        mutationCommonAction.findOne({ referenceId, type: mutationTypeEnum.CREDIT }),
      ]);

      if (!wallet || wallet.status === walletStatusEnum.DISABLED) {
        throw new ErrorWithStatusCode(errorMessage.WALLET_DISABLED, 401);
      }

      if (duplicateMutation) {
        throw new ErrorWithStatusCode(errorMessage.DUPLICATE_REFERENCE_ID, 422);
      }

      await Promise.all([
        walletCommonAction.update(
          { id: wallet.id },
          { balance: wallet.balance += amount },
          transaction,
        ),
        // type defined from bank or wallet company perspective
        mutationCommonAction.create({
          walletId: wallet.id,
          referenceId,
          amount,
          type: mutationTypeEnum.CREDIT,
        }, transaction),
      ]);

      await transaction.commit();
      const updatedWallet = await walletCommonAction
        .findOne({ ownerId: userId });
      return updatedWallet;
    } catch (error) {
      transaction.rollback();
      throw (error);
    }
  },
  expendMoney: async (userId, referenceId, amount) => {
    const transaction = await sequelize.transaction();
    try {
      const [wallet, duplicateMutation] = await Promise.all([
        walletCommonAction
          .findOne({ ownerId: userId }),
        mutationCommonAction.findOne({ referenceId, type: mutationTypeEnum.DEBIT }),
      ]);

      if (!wallet || wallet.status === walletStatusEnum.DISABLED) {
        throw new ErrorWithStatusCode(errorMessage.WALLET_DISABLED, 401);
      }

      if (wallet.balance < amount) {
        throw new ErrorWithStatusCode(errorMessage.INSUFFICIENT_BALANCE, 422);
      }

      if (duplicateMutation) {
        throw new ErrorWithStatusCode(errorMessage.DUPLICATE_REFERENCE_ID, 422);
      }

      await Promise.all([
        walletCommonAction.update(
          { id: wallet.id },
          { balance: wallet.balance -= amount },
          transaction,
        ),
        // type defined from bank or wallet company perspective
        mutationCommonAction.create({
          walletId: wallet.id,
          referenceId,
          amount,
          type: mutationTypeEnum.DEBIT,
        }, transaction),
      ]);

      await transaction.commit();
      const updatedWallet = await walletCommonAction
        .findOne({ ownerId: userId });
      return updatedWallet;
    } catch (error) {
      transaction.rollback();
      throw (error);
    }
  },
};
