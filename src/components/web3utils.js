// General web3 utility functions

export function redactAddress(account) {
  return (
    account.substring(0, 6) + "...." + account.substring(account.length - 4)
  );
}
