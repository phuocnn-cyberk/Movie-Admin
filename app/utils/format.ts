
const truncateAddress = (address: string) => {
  if (!address) return "";
  if (address.length <= 10) return address;
  return `${address.slice(0, 24)}...${address.slice(-4)}`;
};

// format helper
const fh = {
  truncateAddress,
};

export { fh };
