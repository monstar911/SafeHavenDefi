import BigNumber from "bignumber.js";
import stakesConfig from "../../../constants/stake";
import safeStakeABI from "../../../abi/safeStake.json";
import sltTokenABI from "../../../abi/safeLayerToken.json";
import multicall from "../../../utils/multicall";
import { getAddress } from "../../../utils/addressHelpers";
import { BIG_TEN } from "../../../utils/bigNumber";

export const fetchStakesBlockLimits = async () => {
  const callsStartBlock = stakesConfig.map((stakeConfig) => {
    return {
      address: getAddress(stakeConfig.contractAddress),
      name: "startBlock",
    };
  });
  const callsEndBlock = stakesConfig.map((stakeConfig) => {
    return {
      address: getAddress(stakeConfig.contractAddress),
      name: "bonusEndBlock",
    };
  });
  const callsRewardTokenPerBlock = stakesConfig.map((stakeConfig) => {
    return {
      address: getAddress(stakeConfig.contractAddress),
      name: "rewardPerBlock",
    };
  });

  const callsDepositFee = stakesConfig.map((stakeConfig) => {
    return {
      address: getAddress(stakeConfig.contractAddress),
      name: "depositFeeAmount",
    };
  });
  const starts = await multicall(safeStakeABI, callsStartBlock);
  const ends = await multicall(safeStakeABI, callsEndBlock);
  const rewardTokenPerBlock = await multicall(
    safeStakeABI,
    callsRewardTokenPerBlock
  );
  const depositFee = await multicall(safeStakeABI, callsDepositFee);

  return stakesConfig.map((sltstakeConfig, index) => {
    const startBlock = starts[index];
    const endBlock = ends[index];
    return {
      sousId: sltstakeConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
      rewardTokenPerBlock: new BigNumber(rewardTokenPerBlock)
        .div(BIG_TEN.pow(18))
        .toJSON(),
      depositFee: new BigNumber(depositFee).div(100).toJSON(),
    };
  });
};

export const fetchStakesTotalStaking = async () => {
  const callsStakes = stakesConfig.map((stakeConfig) => {
    return {
      address: stakeConfig.stakingToken.address,
      name: "balanceOf",
      params: [getAddress(stakeConfig.contractAddress)],
    };
  });
  const StakesTotalStaked = await multicall(sltTokenABI, callsStakes);
  return [
    ...stakesConfig.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(StakesTotalStaked[index]).toJSON(),
    })),
  ];
};
