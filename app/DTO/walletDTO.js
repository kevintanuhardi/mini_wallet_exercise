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
