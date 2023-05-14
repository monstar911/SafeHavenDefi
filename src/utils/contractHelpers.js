import { ethers } from "ethers";
import { simpleRpcProvider } from "./providers";
import stakesConfig from "../constants/stake";
import {
  getAddress,
  getHavenTokenAddress,
  getDividendDistributorAddress,
  getSltTokenAddress,
  getSafeChefAddress,
  getSafeReferralAddress,
  getLaunchpadAddress,
  getMulticallAddress,
} from "./addressHelpers";
import havenTokenABI from "../abi/havenTokenContract.json";
import dividendDistributorABI from "../abi/dividendDistributorContract.json";
import sltTokenABI from "../abi/safeLayerToken.json";
import safeChefABI from "../abi/safeChef.json";
import safeReferralABI from "../abi/safeReferral.json";
import launchpadABI from "../abi/launchpad.json";
import safeStakeABI from "../abi/safeStake.json";

import bep20Abi from "../abi/erc20.json";
import MultiCallAbi from "../abi/Multicall.json";

const getContract = (abi, address, signer) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getHavenTokenContract = (signer) => {
  return getContract(havenTokenABI, getHavenTokenAddress(), signer);
};

export const getDividendDistributorContract = (signer) => {
  return getContract(
    dividendDistributorABI,
    getDividendDistributorAddress(),
    signer
  );
};

export const getSltTokenContract = (signer) => {
  return getContract(sltTokenABI, getSltTokenAddress(), signer);
};

export const getSafeChefContract = (signer) => {
  return getContract(safeChefABI, getSafeChefAddress(), signer);
};

export const getSafeReferralContract = (signer) => {
  return getContract(safeReferralABI, getSafeReferralAddress(), signer);
};

export const getLaunchpadContract = (signer) => {
  return getContract(launchpadABI, getLaunchpadAddress(), signer);
};

export const getBep20Contract = (address, signer) => {
  return getContract(bep20Abi, address, signer);
};

export const getMulticallContract = (signer) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer);
};

export const getSafeStakeContract = (id, signer) => {
  const config = stakesConfig.find((stake) => stake.sousId === id);
  return getContract(safeStakeABI, getAddress(config.contractAddress), signer);
};
