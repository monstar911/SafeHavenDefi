import BigNumber from "bignumber.js";
import { deserializeToken } from "../user-slice/hooks/helpers";
import { BIG_ZERO } from "../../../utils/bigNumber";

export const transformUserData = (userData) => {
  return {
    allowance: userData ? new BigNumber(userData.allowance) : BIG_ZERO,
    stakingTokenBalance: userData
      ? new BigNumber(userData.stakingTokenBalance)
      : BIG_ZERO,
    stakedBalance: userData ? new BigNumber(userData.stakedBalance) : BIG_ZERO,
    pendingReward: userData ? new BigNumber(userData.pendingReward) : BIG_ZERO,
    withdrawFee: userData ? new BigNumber(userData.withdrawFee) : BIG_ZERO,
  };
};

export const transformStake = (stake) => {
  const {
    totalStaked,
    stakingLimit,
    userData,
    stakingToken,
    earningToken,
    depositFee,
    ...rest
  } = stake;

  return {
    ...rest,
    stakingToken: deserializeToken(stakingToken),
    earningToken: deserializeToken(earningToken),
    userData: transformUserData(userData),
    totalStaked: new BigNumber(totalStaked),
    stakingLimit: new BigNumber(stakingLimit),
    depositFee: new BigNumber(depositFee),
  };
};

export const getTokenPricesFromFarm = (farms) => {
  return farms.reduce((prices, farm) => {
    const quoteTokenAddress = farm.quoteToken.address.toLocaleLowerCase();
    const tokenAddress = farm.token.address.toLocaleLowerCase();
    /* eslint-disable no-param-reassign */
    if (!prices[quoteTokenAddress]) {
      prices[quoteTokenAddress] = new BigNumber(
        farm.quoteTokenPriceBusd
      ).toNumber();
    }
    if (!prices[tokenAddress]) {
      prices[tokenAddress] = new BigNumber(farm.tokenPriceBusd).toNumber();
    }
    /* eslint-enable no-param-reassign */
    return prices;
  }, {});
};
