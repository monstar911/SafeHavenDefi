import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { BIG_ZERO } from "../../../utils/bigNumber";
import poolsConfig from "../../../constants/pools";
import useRefresh from "../../../hooks/useRefresh";
import { deserializeToken } from "../user-slice/hooks/helpers";
import { fetchPoolsPublicDataAsync, fetchPoolUserDataAsync } from ".";

const deserializePoolUserData = (pool) => {
  return {
    allowance: pool.userData
      ? new BigNumber(pool.userData.allowance)
      : BIG_ZERO,
    tokenBalance: pool.userData
      ? new BigNumber(pool.userData.tokenBalance)
      : BIG_ZERO,
    stakedBalance: pool.userData
      ? new BigNumber(pool.userData.stakedBalance)
      : BIG_ZERO,
    earnings: pool.userData
      ? new BigNumber(pool.userData.earnings)
      : BIG_ZERO,
    withdrawFee: pool.userData
      ? new BigNumber(pool.userData.withdrawFee)
      : BIG_ZERO,
    lastDepositTime: pool.userData
      ? new BigNumber(pool.userData.lastDepositTime)
      : BIG_ZERO,
  };
};

const deserializePool = (pool) => {
  const {
    stakeSymbol,
    pid,
    dual,
    multiplier,
    isCommunity,
    tokenPriceBusd,
    isWithdrawFee,
    depositFeeBP,
    liquidity,
    apr,
    stakeTokenRatio,
    earningsPerBlock,
  } = pool;
  return {
    liquidity,
    apr,
    stakeTokenRatio,
    earningsPerBlock,
    isWithdrawFee,
    depositFeeBP,
    stakeSymbol,
    pid,
    dual,
    multiplier,
    isCommunity,
    tokenPriceBusd,
    token: deserializeToken(pool.token),
    userData: deserializePoolUserData(pool),
    tokenAmountTotal: pool.tokenAmountTotal
      ? new BigNumber(pool.tokenAmountTotal)
      : BIG_ZERO,
    stakedTotalToken: pool.stakedTotalToken
      ? new BigNumber(pool.stakedTotalToken)
      : BIG_ZERO,
    tokenTotalSupply: pool.tokenTotalSupply
      ? new BigNumber(pool.tokenTotalSupply)
      : BIG_ZERO,
    poolWeight: pool.poolWeight ? new BigNumber(pool.poolWeight) : BIG_ZERO,
  };
};

export const usePollPoolsWithUserData = () => {
  const dispatch = useDispatch();
  const { slowRefresh } = useRefresh();
  const { account } = useWeb3React();

  useEffect(() => {
    const pids = poolsConfig.map((stakeToFetch) => stakeToFetch.pid);

    dispatch(fetchPoolsPublicDataAsync(pids));

    if (account) {
      dispatch(fetchPoolUserDataAsync({ account, pids }));
    }
  }, [dispatch, slowRefresh, account]);
};

export const usePools = () => {
  const stakes = useSelector((state) => state.pools);
  const deserializedStakesData = stakes.data.map(deserializePool);
  const { userDataLoaded } = stakes;
  return {
    userDataLoaded,
    data: deserializedStakesData,
  };
};

export const usePoolFromPid = (pid) => {
  const stake = useSelector((state) =>
    state.pools.data.find((f) => f.pid === pid)
  );
  return stake && deserializePool(stake);
};

export const usePoolUser = (pid) => {
  const { userData } = usePoolFromPid(pid);
  const { allowance, tokenBalance, stakedBalance, earnings } = userData;
  return {
    allowance,
    tokenBalance,
    stakedBalance,
    earnings,
  };
};
