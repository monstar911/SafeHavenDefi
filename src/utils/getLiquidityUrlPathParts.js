import tokens from "../constants/tokens";

const getLiquidityUrlPathParts = ({ quoteTokenAddress, tokenAddress }) => {
  const wBnbAddress = tokens.wbnb.address;
  const firstPart =
    !quoteTokenAddress || quoteTokenAddress === wBnbAddress
      ? "WBNB"
      : quoteTokenAddress;
  const secondPart =
    !tokenAddress || tokenAddress === wBnbAddress ? "WBNB" : tokenAddress;
  return `${firstPart}/${secondPart}`;
};

export default getLiquidityUrlPathParts;
