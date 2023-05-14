import BigNumber from "bignumber.js";
import multicall from "../../../utils/multicall";
import { getSafeChefAddress } from "../../../utils/addressHelpers";
import erc20ABI from "../../../abi/erc20.json";
import safechefABI from "../../../abi/safeChef.json";

export const fetchPoolUserAllowances = async (account, stakesToFetch) => {
  const safeChefAddress = getSafeChefAddress();

  const calls = stakesToFetch.map((stake) => {
    return {
      address: stake.token.address,
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

export const fetchPoolUserTokenBalances = async (account, stakesToFetch) => {
  const calls = stakesToFetch.map((stake) => {
    return {
      address: stake.token.address,
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

export const fetchPoolUserStakedBalances = async (account, stakesToFetch) => {
  const safeChefAddress = getSafeChefAddress();

  const calls = stakesToFetch.map((stake) => {
    return {
      address: safeChefAddress,
      name: "userInfo",
      params: [stake.pid, account],
    };
  });

  const rawStakedBalances = await multicall(safechefABI, calls);
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON();
  });
  return parsedStakedBalances;
};

export const fetchPoolUserEarnings = async (account, stakesToFetch) => {
  const safeChefAddress = getSafeChefAddress();

  const calls = stakesToFetch.map((stake) => {
    return {
      address: safeChefAddress,
      name: "pendingEarnings",
      params: [stake.pid, account],
    };
  });

  const rawEarnings = await multicall(safechefABI, calls);
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON();
  });
  return parsedEarnings;
};

export const fetchPoolWithdrawFee = async (account, stakesToFetch) => {
  const safeChefAddress = getSafeChefAddress();

  const calls = stakesToFetch.map((stake) => {
    return {
      address: safeChefAddress,
      name: "getWithdrawFee",
      params: [stake.pid, account],
    };
  });
  const fees = await multicall(safechefABI, calls);
  const withdrawFee = fees.map((fee) => {
    return new BigNumber(fee).toJSON();
  });
  return withdrawFee;
};

export const fetchPoolUserLastDepositTime = async (account, stakesToFetch) => {
  const safeChefAddress = getSafeChefAddress();

  const calls = stakesToFetch.map((stake) => {
    return {
      address: safeChefAddress,
      name: "userInfo",
      params: [stake.pid, account],
    };
  });
  const rawLastDepositTimes = await multicall(safechefABI, calls);
  const lastDepositTimes = rawLastDepositTimes.map((stakedBalance) => {
    return new BigNumber(stakedBalance[2]._hex).toJSON();
  });
  return lastDepositTimes;
};
