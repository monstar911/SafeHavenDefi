import stakesConfig from "../../../constants/stake";
import safeStakeABI from "../../../abi/safeStake.json";
import erc20ABI from "../../../abi/erc20.json";
import multicall from "../../../utils/multicall";
import { getSafeChefContract } from "../../../utils/contractHelpers";
import { getAddress } from "../../../utils/addressHelpers";
import BigNumber from "bignumber.js";

const safeChefContract = getSafeChefContract();

export const fetchStakesAllowance = async (account) => {
  const calls = stakesConfig.map((stake) => ({
    address: stake.stakingToken.address,
    name: "allowance",
    params: [account, getAddress(stake.contractAddress)],
  }));

  const allowances = await multicall(erc20ABI, calls);
  return stakesConfig.reduce(
    (acc, stake, index) => ({
      ...acc,
      [stake.sousId]: new BigNumber(allowances[index]).toJSON(),
    }),
    {}
  );
};

export const fetchUserBalances = async (account) => {
  const calls = stakesConfig.map((stake) => ({
    address: stake.stakingToken.address,
    name: "balanceOf",
    params: [account],
  }));
  const tokenBalancesRaw = await multicall(erc20ABI, calls);
  const tokenBalances = stakesConfig.reduce(
    (acc, stake, index) => ({
      ...acc,
      [stake.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON(),
    }),
    {}
  );

  return { ...tokenBalances };
};

export const fetchUserStakeBalances = async (account) => {
  const calls = stakesConfig.map((p) => ({
    address: getAddress(p.contractAddress),
    name: "userInfo",
    params: [account],
  }));
  const userInfo = await multicall(safeStakeABI, calls);
  const stakedBalances = stakesConfig.reduce(
    (acc, stake, index) => ({
      ...acc,
      [stake.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {}
  );

  const { amount: masterStakeAmount } = await safeChefContract.userInfo(
    "0",
    account
  );

  return {
    ...stakedBalances,
    0: new BigNumber(masterStakeAmount.toString()).toJSON(),
  };
};

export const fetchUserPendingRewards = async (account) => {
  const calls = stakesConfig.map((p) => ({
    address: getAddress(p.contractAddress),
    name: "pendingReward",
    params: [account],
  }));
  const res = await multicall(safeStakeABI, calls);
  const pendingRewards = stakesConfig.reduce(
    (acc, stake, index) => ({
      ...acc,
      [stake.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {}
  );

  const pendingReward = [];

  return {
    ...pendingRewards,
    0: new BigNumber(pendingReward.toString()).toJSON(),
  };
};

export const fetchUserWithdrawFee = async (account) => {
  const calls = stakesConfig.map((p) => ({
    address: getAddress(p.contractAddress),
    name: "getWithdrawalFeeBP",
    params: [account],
  }));
  const withdrawFeeBP = await multicall(safeStakeABI, calls);
  const withdrawFees = stakesConfig.reduce(
    (acc, stake, index) => ({
      ...acc,
      [stake.sousId]: new BigNumber(withdrawFeeBP[index]).div(100).toJSON(),
    }),
    {}
  );

  const withdrawFee = [];

  return { ...withdrawFees, 0: new BigNumber(withdrawFee.toString()).toJSON() };
};
