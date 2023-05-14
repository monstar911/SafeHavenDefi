import React from "react";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Text, Flex, Skeleton } from "@pancakeswap/uikit";
import BigNumber from "bignumber.js";
import { BIG_TEN } from "../../../../utils/bigNumber";
import { formatNumber } from "../../../../utils/formatBalance";

const SectionSide = styled.div`
  padding-right: 16px;
`;

const LaunchpadCardDetails = ({
  token,
  tokenLabel,
  minHavenToJoin,
  userData,
  offeringAmountPool,
  raisingAmountPool,
  totalCommittedPercent,
  totalLPCommitted,
  maxCommitRatio,
  totalAmountPool,
  getCommittedValue,
  limitPerUserInLP,
}) => {
  const stakeData = useSelector((state) => state.pools.data);
  // const sltPrice = useSelector((state) => state.app.priceOfOneSLT);
  const havenPrice = useSelector((state) => state.app.priceOfOneHaven);
  let app = useSelector((state) => state.app.userBalanceOfHAVEN);
  const { account } = useWeb3React();
  let tokenPrice;
  if (tokenLabel === "HAVEN") {
    tokenPrice = havenPrice;
  } else {
    tokenPrice = stakeData.filter((data) => data.stakeSymbol === tokenLabel)[0]
      .tokenPriceBusd;
  }

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mb="12px">
        <SectionSide>
          <Text color="text" bold fontSize="17px">
            Total committed
          </Text>
        </SectionSide>
        <Text color="primary" bold fontSize="17px">
          {tokenPrice && totalLPCommitted && totalCommittedPercent ? (
            `${new Intl.NumberFormat("en-US").format(
              formatNumber(new BigNumber(totalLPCommitted).toNumber())
            )} ${tokenLabel} (${totalCommittedPercent}%)`
          ) : (
            <Skeleton width={100} />
          )}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb="12px">
        <SectionSide>
          <Text color="text" bold fontSize="17px">
            You will get
          </Text>
          <Text color="lightText" fontSize="17px">
            % of your committed value
          </Text>
        </SectionSide>
        <Text color="primary" bold fontSize="17px">
          {getCommittedValue ? (
            `${getCommittedValue}%`
          ) : (
            <Skeleton width={100} />
          )}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb="12px">
        <SectionSide>
          <Text color="text" bold fontSize="17px">
            You will be returned
          </Text>
          <Text color="lightText" fontSize="17px">
            % of your committed value
          </Text>
        </SectionSide>
        <Text color="primary" bold fontSize="17px">
          {getCommittedValue ? (
            `${100 - getCommittedValue}%`
          ) : (
            <Skeleton width={100} />
          )}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb="12px">
        <SectionSide>
          <Text color="text" bold fontSize="17px">
            Funds to raise
          </Text>
        </SectionSide>
        <Text color="text" fontSize="17px">
          {raisingAmountPool ? (
            `${new Intl.NumberFormat("en-US").format(
              raisingAmountPool
            )} ${tokenLabel}`
          ) : (
            <Skeleton width={100} />
          )}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb="12px">
        <SectionSide>
          <Text color="text" bold fontSize="17px">
            Min HAVEN
          </Text>
          <Text color="text" bold fontSize="17px">
            owned to join
          </Text>
        </SectionSide>
        <Text color="text" fontSize="17px">
          {minHavenToJoin ? (
            `${new Intl.NumberFormat("en-US").format(minHavenToJoin)} HAVEN`
          ) : (
            <Skeleton width={100} />
          )}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb="12px">
        <SectionSide>
          <Text color="text" bold fontSize="17px">
            Your HAVEN
          </Text>
        </SectionSide>
        <Text color="text" fontSize="17px">
          {account ? (
              app/Math.pow(10, 9)
          ) : (
            "connect wallet"
          )}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb="12px">
        <SectionSide>
          <Text color="text" bold fontSize="17px">
            Your max
          </Text>
          <Text color="text" bold fontSize="17px">
            {tokenLabel} to join
          </Text>
        </SectionSide>
        <Text color="primary" bold fontSize="17px">
          {limitPerUserInLP ? (
            `${new Intl.NumberFormat("en-US").format(
              limitPerUserInLP
            )}`
          ) : (
            <Skeleton width={100} />
          )}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb="12px">
        <SectionSide>
          <Text color="text" bold fontSize="17px">
            Price
          </Text>
        </SectionSide>
        <Text color="text" fontSize="17px">
          {raisingAmountPool && offeringAmountPool ? (
            `1 SLT = ${new Intl.NumberFormat("en-US").format(
              raisingAmountPool.div(offeringAmountPool)
            )} ${tokenLabel}`
          ) : (
            <Skeleton width={100} />
          )}
        </Text>
      </Flex>
      <Flex flexDirection="column" mb="12px">
        <Flex>
          <Text color="text" bold fontSize="17px" mr="4px">
            {tokenLabel}
          </Text>
          <Text color="primary" bold fontSize="17px">
            COMMITTED
          </Text>
        </Flex>
        <Text color="primary" fontSize="28px">
          {userData.amount ? (
            `${new Intl.NumberFormat("en-US").format(
              userData.amount.div(BIG_TEN.pow(token.decimals))
            )}`
          ) : (
            <Skeleton width={100} />
          )}
        </Text>
      </Flex>
    </>
  );
};

export default LaunchpadCardDetails;
