import BigNumber from "bignumber.js";
import { getAddress, getSafeChefAddress } from "../../../utils/addressHelpers";
import { BIG_TEN, BIG_ZERO } from "../../../utils/bigNumber";
import multicall from "../../../utils/multicall";
import safechefABI from "../../../abi/safeChef.json";
import erc20 from "../../../abi/erc20.json";
import strategyChefABI from "../../../abi/strategyChef.json";
import lpABI from "../../../abi/lp.json";

const fetchFarm = async (farm) => {
  const { pid, lpAddresses, token, quoteToken } = farm;
  const lpAddress = getAddress(lpAddresses);
  const calls = [
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
    tokenBalanceLP,
    quoteTokenBalanceLP,
    tokenDecimals,
    quoteTokenDecimals,
  ] = await multicall(erc20, calls);
  const [wantAddress, ratio] =
    pid || pid === 0
      ? await multicall(strategyChefABI, [
          {
            address: farm.strat,
            name: "wantAddress",
          },
          {
            address: farm.strat,
            name: "wantLockedTotal",
          },
        ])
      : [null, null];
  const [totalSupply] =
    pid || pid === 0
      ? await multicall(lpABI, [
          {
            address: wantAddress[0],
            name: "totalSupply",
          },
        ])
      : [null];
  let totalLPsupply = new BigNumber(totalSupply).div(BIG_TEN.pow(18));
  let lpTokenRatio = new BigNumber(ratio).div(BIG_TEN.pow(18));

  const tokenAmountTotal = new BigNumber(tokenBalanceLP.balance._hex).div(
    BIG_TEN.pow(tokenDecimals)
  );
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP.balance._hex).div(
    BIG_TEN.pow(quoteTokenDecimals)
  );

  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio);

  let lpTotalInQuoteToken = quoteTokenAmountMc
    .div(totalLPsupply)
    .times(new BigNumber(2));
  if (totalLPsupply.toString() === "0") {
    lpTotalInQuoteToken = BIG_ZERO;
  }
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
      : [null, null, null];

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
  const depositFeeBP = info ? info.depositFeeBP : 0;
  const isWithdrawFee = info ? info.isWithdrawFee : 0;
  const isCommunity = false;

  return {
    tokenAmountTotal: tokenAmountTotal.toString(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.toString(),
    lpTotalSupply: new BigNumber(totalLPsupply).toString(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toString(),
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toString(),
    poolWeight: poolWeight.toString(),
    multiplier: `${allocPoint.div(100).toString()}X`,
    totalAllocPoint,
    earningsPerBlock: new BigNumber(earningsPerBlock).div(BIG_TEN.pow(18)),
    lpTokenRatio,
    lastRewardBlock,
    accEarningsPerShare,
    depositFeeBP,
    isWithdrawFee,
    isCommunity,
    quoteTokenAmountMc,
  };
};

export default fetchFarm;
