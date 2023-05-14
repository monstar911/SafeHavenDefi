import BigNumber from "bignumber.js";
import multicall from "../../../utils/multicall";
import {
  getLaunchpadAddress,
  getHavenTokenAddress,
} from "../../../utils/addressHelpers";
import { BIG_TEN } from "../../../utils/bigNumber";
import launchpadABI from "../../../abi/launchpad.json";
import erc20 from "../../../abi/erc20.json";

export const fetchLaunchpadUserReferralsCount = async (account) => {
  const referralsCount = await multicall(launchpadABI, [
    {
      address: getLaunchpadAddress(),
      name: "referralsCount",
      params: [account],
    },
  ]);
  return new BigNumber(referralsCount).toJSON();
};

export const fetchLaunchpadUserInfo = async (account, pids) => {
  const [viewUserInfo, viewUserAllocationPools] = await multicall(
    launchpadABI,
    [
      {
        address: getLaunchpadAddress(),
        name: "viewUserInfo",
        params: [account, pids],
      },
      {
        address: getLaunchpadAddress(),
        name: "viewUserAllocationPools",
        params: [account, pids],
      },
    ]
  );
  const userAllocation = viewUserAllocationPools.map((value) => {
    return new BigNumber(value._hex);
  });
  const userAmounts = viewUserInfo[0][0].map((value) => {
    return new BigNumber(value._hex);
  });
  const userClaimed = viewUserInfo[0][1];
  return { userAmounts, userClaimed, userAllocation };
};

export const fetchUserHavenAmount = async (account) => {
  const [userHavenAmount, tokenDecimals] = await multicall(erc20, [
    {
      address: getHavenTokenAddress(),
      name: "balanceOf",
      params: [account],
    },
    {
      address: getHavenTokenAddress(),
      name: "decimals",
    },
  ]);
  return new BigNumber(userHavenAmount).div(BIG_TEN.pow(tokenDecimals));
};
