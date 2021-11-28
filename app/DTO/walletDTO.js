exports.walletDTO = ({
  id,
  ownedBy,
  status,
  enabledAt,
  balance,
}) => ({
  id,
  owned_by: ownedBy,
  status,
  enabled_at: enabledAt,
  balance: Number(balance).toFixed(2),
});

exports.depositDTO = ({
  id,
  userId,
  createdAt,
  amount,
  referenceId,
}) => ({
  id,
  deposited_by: userId,
  status: 'success',
  deposited_at: createdAt,
  amount: Number(amount).toFixed(2),
  reference_id: referenceId,
});

exports.withdrawalDTO = ({
  id,
  userId,
  createdAt,
  amount,
  referenceId,
}) => ({
  id,
  withdrawn_by: userId,
  status: 'success',
  withdrawn_at: createdAt,
  amount: Number(amount).toFixed(2),
  reference_id: referenceId,
});
