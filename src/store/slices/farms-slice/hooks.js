import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { BIG_ZERO } from "../../../utils/bigNumber";
import farmsConfig from "../../../constants/farms";
import useRefresh from "../../../hooks/useRefresh";
import { deserializeToken } from "../user-slice/hooks/helpers";
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync, fetchFarmsBlockNumberDataAsync } from ".";

const deserializeFarmUserData = (farm) => {
  return {
    allowance: farm.userData
      ? new BigNumber(farm.userData.allowance)
      : BIG_ZERO,
    tokenBalance: farm.userData
      ? new BigNumber(farm.userData.tokenBalance)
      : BIG_ZERO,
    stakedBalance: farm.userData
      ? new BigNumber(farm.userData.stakedBalance)
      : BIG_ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
    withdrawFee: farm.userData
      ? new BigNumber(farm.userData.withdrawFee)
      : BIG_ZERO,
    lastDepositTime: farm.userData
      ? new BigNumber(farm.userData.lastDepositTime)
      : BIG_ZERO,
  };
};

const deserializeFarm = (farm) => {
  const {
    quoteTokenAmountTotal,
    lpAddresses,
    lpSymbol,
    pid,
    dual,
    multiplier,
    isCommunity,
    quoteTokenPriceBusd,
    tokenPriceBusd,
    isWithdrawFee,
    depositFeeBP,
    earningsPerBlock,
    quoteTokenAmountMc,
    totalAllocPoint,
    lpTokenRatio,
    liquidity,
    apr,
    lastRewardBlock,
    accEarningsPerShare,
  } = farm;
  return {
    accEarningsPerShare,
    lastRewardBlock,
    quoteTokenAmountTotal,
    liquidity,
    apr,
    isWithdrawFee,
    depositFeeBP,
    lpAddresses,
    lpSymbol,
    pid,
    dual,
    multiplier,
    isCommunity,
    quoteTokenPriceBusd,
    tokenPriceBusd,
    token: deserializeToken(farm.token),
    quoteToken: deserializeToken(farm.quoteToken),
    userData: deserializeFarmUserData(farm),
    tokenAmountTotal: farm.tokenAmountTotal
      ? new BigNumber(farm.tokenAmountTotal)
      : BIG_ZERO,
    lpTotalInQuoteToken: farm.lpTotalInQuoteToken
      ? new BigNumber(farm.lpTotalInQuoteToken)
      : BIG_ZERO,
    lpTotalSupply: farm.lpTotalSupply
      ? new BigNumber(farm.lpTotalSupply)
      : BIG_ZERO,
    tokenPriceVsQuote: farm.tokenPriceVsQuote
      ? new BigNumber(farm.tokenPriceVsQuote)
      : BIG_ZERO,
    poolWeight: farm.poolWeight ? new BigNumber(farm.poolWeight) : BIG_ZERO,
    earningsPerBlock,
    totalAllocPoint,
    lpTokenRatio,
    quoteTokenAmountMc,
  };
};

export const usePollFarmsPublicData = () => {
  const dispatch = useDispatch();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    const pids = farmsConfig.map((farmToFetch) => farmToFetch.pid);

    dispatch(fetchFarmsPublicDataAsync(pids));
  }, [dispatch, slowRefresh]);
};

export const usePollFarmsWithUserData = () => {
  const dispatch = useDispatch();
  const { slowRefresh } = useRefresh();
  const { account } = useWeb3React();

  useEffect(() => {
    const pids = farmsConfig.map((farmToFetch) => farmToFetch.pid);

    dispatch(fetchFarmsPublicDataAsync(pids));

    if (account) {
      dispatch(fetchFarmUserDataAsync({ account, pids }));
    }
  }, [dispatch, slowRefresh, account]);
};

export const useFarms = () => {
  const farms = useSelector((state) => state.farms);
  const deserializedFarmsData = farms.data.map(deserializeFarm);
  const { userDataLoaded } = farms;
  return {
    userDataLoaded,
    data: deserializedFarmsData,
  };
};

export const useFarmsFetchBlockNumber = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFarmsBlockNumberDataAsync());
  }, [dispatch])
}

export const useFarmFromPid = (pid) => {
  const farm = useSelector((state) =>
    state.farms.data.find((f) => f.pid === pid)
  );
  return deserializeFarm(farm);
};

export const useFarmFromLpSymbol = (lpSymbol) => {
  const farm = useSelector((state) =>
    state.farms.data.find((f) => f.lpSymbol === lpSymbol)
  );
  return deserializeFarm(farm);
};

export const useFarmUser = (pid) => {
  const { userData } = useFarmFromPid(pid);
  const {
    allowance,
    tokenBalance,
    stakedBalance,
    earnings,
    withdrawFee,
    lastDepositTime,
  } = userData;
  return {
    allowance,
    tokenBalance,
    stakedBalance,
    earnings,
    withdrawFee,
    lastDepositTime,
  };
};

export const useBusdPriceFromPid = (pid) => {
  const farm = useFarmFromPid(pid);
  return farm && new BigNumber(farm.tokenPriceBusd);
};

export const useLpTokenPrice = (symbol) => {
  const farm = useFarmFromLpSymbol(symbol);
  const farmTokenPriceInUsd = useBusdPriceFromPid(farm.pid);
  let lpTokenPrice = BIG_ZERO;

  if (farm.lpTotalSupply.gt(0) && farm.lpTotalInQuoteToken.gt(0)) {
    const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(
      farm.tokenAmountTotal
    );
    const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2);
    const totalLpTokens = farm.lpTotalSupply;
    lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens);
  }

  return lpTokenPrice;
};
