type TDefinition = (
  addr: string | null | undefined,
  balance: number
) => boolean;

export const allowedToMint: TDefinition = (addr, balance) => {
  const isOwner = addr === process.env.REACT_APP_OWNER_ADDRESS;
  const allowedBalance = isOwner ? true : (balance as number) < 5;

  return allowedBalance;
};
