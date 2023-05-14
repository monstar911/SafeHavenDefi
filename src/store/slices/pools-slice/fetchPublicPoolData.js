import BigNumber from "bignumber.js";
import { getAddress, getSafeChefAddress } from "../../../utils/addressHelpers";
import { BIG_TEN, BIG_ZERO } from "../../../utils/bigNumber";
import multicall from "../../../utils/multicall";
import safechefABI from "../../../abi/safeChef.json";
import erc20 from "../../../abi/erc20.json";
import strategyChefABI from "../../../abi/strategyChef.json";

const fetchPool = async (stake) => {
  const { pid, lpAddresses, token, quoteToken } = stake;
  const lpAddress = getAddress(lpAddresses);
  const calls = [
    {
      address: token.address,
      name: "balanceOf",
      params: [token.address],
    },
    {
      address: token.address,
      name: "balanceOf",
      params: [lpAddress],
    },
    {
      address: quoteToken.address,
      name: "balanceOf",
      params: [lpAddress],
    },
    {
      address: token.address,
      name: "decimals",
    },
    {
      address: quoteToken.address,
      name: "decimals",
    },
  ];
  const [
    tokenBalance,
    tokenBalanceLP,
    quoteTokenBalanceLP,
    tokenDecimals,
    quoteTokenDecimals,
  ] = await multicall(erc20, calls);
  const [ratio] =
    pid || pid === 0
      ? await multicall(strategyChefABI, [
          {
            address: stake.strat,
            name: "wantLockedTotal",
          },
        ])
      : [null, null];

  let stakeTokenRatio = new BigNumber(ratio).div(BIG_TEN.pow(18));

  const tokenAmountTotal = new BigNumber(tokenBalanceLP.balance._hex).div(
    BIG_TEN.pow(tokenDecimals)
  );
  const tokenAmountContract = new BigNumber(tokenBalance.balance._hex).div(
    BIG_TEN.pow(tokenDecimals)
  );
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP.balance._hex).div(
    BIG_TEN.pow(quoteTokenDecimals)
  );

  const tokenAmountTotalInContract = new BigNumber(tokenBalance.balance._hex).div(
    BIG_TEN.pow(tokenDecimals)
  );

  const tokenAmountMc = tokenAmountContract.times(stakeTokenRatio);

  const stakedTotalToken = tokenAmountMc.times(new BigNumber(2));

  const masterChefABI = safechefABI;
  const [info, totalAllocPoint, earningsPerBlock] =
    pid || pid === 0
      ? await multicall(masterChefABI, [
          {
            address: getSafeChefAddress(),
            name: "poolInfo",
            params: [pid],
          },
          {
            address: getSafeChefAddress(),
            name: "totalAllocPoint",
          },
          {
            address: getSafeChefAddress(),
            name: "EarningsPerBlock",
          },
        ])
      : [null, null];

  const allocPoint = info ? new BigNumber(info.allocPoint._hex) : BIG_ZERO;
  const poolWeight = totalAllocPoint
    ? allocPoint.div(new BigNumber(totalAllocPoint))
    : BIG_ZERO;

  const lastRewardBlock = info
    ? new BigNumber(info.lastRewardBlock._hex)
    : BIG_ZERO;
  const accEarningsPerShare = info
    ? new BigNumber(info.accEarningsPerShare._hex)
    : BIG_ZERO;
  const stratAddress = info ? info.strat : "";
  const depositFeeBP = info ? info.depositFeeBP : 0;
  const isWithdrawFee = info ? info.isWithdrawFee : 0;
  const isCommunity = false;
  return {
    tokenAmountTotal: tokenAmountTotalInContract.toJSON(),
    stakedTotalToken: stakedTotalToken.toJSON(),
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
    poolWeight: poolWeight.toJSON(),
    multiplier: `${allocPoint.div(100).toString()}X`,
    earningsPerBlock: new BigNumber(earningsPerBlock).div(BIG_TEN.pow(18)),
    stakeTokenRatio,
    lastRewardBlock,
    accEarningsPerShare,
    stratAddress,
    depositFeeBP,
    isWithdrawFee,
    isCommunity,
  };
};

export default fetchPool;
