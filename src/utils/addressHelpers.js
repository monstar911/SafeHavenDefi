import { ChainId } from "@pancakeswap/sdk";
import { getAddress as getEthAddress } from "@ethersproject/address";
import addresses from "../constants/contracts";
import { DEFAULT_CHAINID } from "../constants";

export const getAddress = (address) => {
  const chainId = DEFAULT_CHAINID;
  return address[chainId] ? address[chainId] : address[ChainId.MAINNET];
};

export const getHavenTokenAddress = () => {
  return getAddress(addresses.havenToken);
};

export const getDividendDistributorAddress = () => {
  return getAddress(addresses.dividendDistributor);
};

export const getSltTokenAddress = () => {
  return getAddress(addresses.sltToken);
};

export const getSafeChefAddress = () => {
  return getAddress(addresses.safeChef);
};

export const getSafeReferralAddress = () => {
  return getAddress(addresses.safeReferral);
};

export const getLaunchpadAddress = () => {
  return getAddress(addresses.launchpad);
};

export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall);
};

export const isAddress = (value) => {
  try {
    return getEthAddress(value);
  } catch {
    return false;
  }
};
