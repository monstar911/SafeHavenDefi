import BigNumber from "bignumber.js";
import { BLOCKS_PER_YEAR } from "../constants";

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new token allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (
  stakingTokenPrice,
  rewardTokenPrice,
  totalStaked,
  tokenPerBlock
) => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice)
    .times(tokenPerBlock)
    .times(new BigNumber(BLOCKS_PER_YEAR));
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(
    new BigNumber(totalStaked)
  );
  let apr;
  if (totalStakingTokenInPool.toString() === "0") {
    apr = Number.POSITIVE_INFINITY;
  } else {
    apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100);
  }
  return apr === Infinity ? Infinity : apr.toNumber();
};
