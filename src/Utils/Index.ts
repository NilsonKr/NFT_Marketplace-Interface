export const getTruncateAddress = (address: string): string => {
  const truncateAddress = `${address.substring(0, 5)}...${address.slice(-4)}`;

  return truncateAddress;
};
