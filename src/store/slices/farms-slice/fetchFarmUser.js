import BigNumber from "bignumber.js";
import multicall from "../../../utils/multicall";
import { getAddress, getSafeChefAddress } from "../../../utils/addressHelpers";
import erc20ABI from "../../../abi/erc20.json";
import safechefABI from "../../../abi/safeChef.json";

export const fetchFarmUserAllowances = async (account, farmsToFetch) => {
  const safeChefAddress = getSafeChefAddress();

  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses);
    return {
      address: lpContractAddress,
      name: "allowance",
      params: [account, safeChefAddress],
    };
  });

  const rawLpAllowances = await multicall(erc20ABI, calls);
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON();
  });
  return parsedLpAllowances;
};

export const fetchFarmUserTokenBalances = async (account, farmsToFetch) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses);
    return {
      address: lpContractAddress,
      name: "balanceOf",
      params: [account],
    };
  });

  const rawTokenBalances = await multicall(erc20ABI, calls);
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON();
  });
  return parsedTokenBalances;
};

export const fetchFarmUserStakedBalances = async (account, farmsToFetch) => {
  const safeChefAddress = getSafeChefAddress();

  const calls = farmsToFetch.map((farm) => {
    return {
      address: safeChefAddress,
      name: "userInfo",
      params: [farm.pid, account],
    };
  });
  const rawStakedBalances = await multicall(safechefABI, calls);
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON();
  });
  return parsedStakedBalances;
};

export const fetchFarmUserEarnings = async (account, farmsToFetch) => {
  const safeChefAddress = getSafeChefAddress();

  const calls = farmsToFetch.map((farm) => {
    return {
      address: safeChefAddress,
      name: "pendingEarnings",
      params: [farm.pid, account],
    };
  });
  const rawEarnings = await multicall(safechefABI, calls);
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON();
  });
  return parsedEarnings;
};

export const fetchFarmWithdrawFee = async (account, farmsToFetch) => {
  const safeChefAddress = getSafeChefAddress();

  const calls = farmsToFetch.map((farm) => {
    return {
      address: safeChefAddress,
      name: "getWithdrawFee",
      params: [farm.pid, account],
    };
  });
  const fees = await multicall(safechefABI, calls);
  const withdrawFee = fees.map((fee) => {
    return new BigNumber(fee).toJSON();
  });
  return withdrawFee;
};

export const fetchFarmUserLastDepositTime = async (account, farmsToFetch) => {
  const safeChefAddress = getSafeChefAddress();

  const calls = farmsToFetch.map((farm) => {
    return {
      address: safeChefAddress,
      name: "userInfo",
      params: [farm.pid, account],
    };
  });
  const rawLastDepositTimes = await multicall(safechefABI, calls);
  const lastDepositTimes = rawLastDepositTimes.map((stakedBalance) => {
    return new BigNumber(stakedBalance[2]._hex).toJSON();
  });
  return lastDepositTimes;
};
