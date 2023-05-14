import BigNumber from "bignumber.js";
import { getLaunchpadAddress } from "../../../utils/addressHelpers";
import multicall from "../../../utils/multicall";
import { BIG_TEN } from "../../../utils/bigNumber";
import launchpadABI from "../../../abi/launchpad.json";

const fetchLaunchpad = async (launchpad) => {
  const { pid, token } = launchpad;
  const [viewPoolInformation, startBlock, endBlock, viewPoolTaxRateOverflow] =
    await multicall(launchpadABI, [
      {
        address: getLaunchpadAddress(),
        name: "viewPoolInformation",
        params: [pid],
      },
      {
        address: getLaunchpadAddress(),
        name: "startBlock",
      },
      {
        address: getLaunchpadAddress(),
        name: "endBlock",
      },
      {
        address: getLaunchpadAddress(),
        name: "viewPoolTaxRateOverflow",
        params: [pid],
      },
    ]);

  const hasTax = viewPoolInformation.hasTax;
  const hasWhitelist = viewPoolInformation.hasWhitelist;
  const isStopDeposit = viewPoolInformation.isStopDeposit;
  const limitPerUserInLP = new BigNumber(
    viewPoolInformation.limitPerUserInLP._hex
  ).div(BIG_TEN.pow(18));
  const maxCommitRatio = new BigNumber(
    viewPoolInformation.maxCommitRatio._hex
  ).div(BIG_TEN.pow(18));
  const minHavenToJoin = new BigNumber(
    viewPoolInformation.minHavenToJoin._hex
  ).div(BIG_TEN.pow(9));
  const offeringAmountPool = new BigNumber(
    viewPoolInformation.offeringAmountPool._hex
  ).div(BIG_TEN.pow(18));
  const raisingAmountPool = new BigNumber(
    viewPoolInformation.raisingAmountPool._hex
  ).div(BIG_TEN.pow(18));
  const sumTaxesOverflow = new BigNumber(
    viewPoolInformation.sumTaxesOverflow._hex
  ).div(BIG_TEN.pow(18));
  const totalAmountPool = new BigNumber(
    viewPoolInformation.totalAmountPool._hex
  ).div(BIG_TEN.pow(token.decimals));

  const totalCommittedPercent = totalAmountPool
    .div(raisingAmountPool)
    .times(100)
    .toFixed(2);
  let getCommittedValue;
  if (totalCommittedPercent < 100) {
    getCommittedValue = 100;
  } else {
    getCommittedValue = raisingAmountPool
      .div(totalAmountPool)
      .times(100)
      .toFixed(2);
  }
  const totalLPCommitted = totalAmountPool.toString();
  return {
    viewPoolTaxRateOverflow: new BigNumber(viewPoolTaxRateOverflow[0]._hex),
    startBlock: new BigNumber(startBlock[0]._hex),
    endBlock: new BigNumber(endBlock[0]._hex),
    hasTax,
    hasWhitelist,
    isStopDeposit,
    limitPerUserInLP,
    maxCommitRatio,
    minHavenToJoin,
    offeringAmountPool,
    raisingAmountPool,
    sumTaxesOverflow,
    totalAmountPool,
    totalCommittedPercent,
    totalLPCommitted,
    getCommittedValue,
  };
};

export default fetchLaunchpad;
