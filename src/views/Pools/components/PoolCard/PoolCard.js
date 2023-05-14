import React, { useState } from "react";
import styled from "styled-components";
import { Card, Flex, Text, Skeleton } from "@pancakeswap/uikit";
import { getBscScanLink } from "../../../../utils";
import ExpandableSectionButton from "../../../../components/ExpandableSectionButton";
import DetailsSection from "./DetailsSection";
import CardHeading from "./CardHeading";
import CardActionsContainer from "./CardActionsContainer";
import ApyButton from "./ApyButton";

const StyledCard = styled(Card)`
  align-self: baseline;
  padding: 0;
  background: transparent !important;

  > div {
    background-color: ${({theme}) => theme.card.background};
  }
`;

const FarmCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
`;

const ExpandingWrapper = styled.div`
  padding: 24px;
  border-top: 2px solid ${({theme}) => theme.colors.borderColor};
  overflow: hidden;
`;

const StakeCard = ({ stake, removed, sltTokenPrice, account, referrer }) => {
  const [showExpandableSection, setShowExpandableSection] = useState(false);

  const totalValueFormatted = stake.liquidity
    ? `$${stake.liquidity
        .toNumber()
        .toLocaleString(undefined, { maximumFractionDigits: 3 })}`
    : "";

  const stakeLabel =
    stake.stakeSymbol && stake.stakeSymbol.toUpperCase().replace("PANCAKE", "");
  const earnLabel = stake.dual ? stake.dual.earnLabel : "SLT";

  const getTokenLink = stake.tokenAddress
    ? `https://pancakeswap.finance/swap?outputCurrency=${stake.tokenAddress}`
    : "https://pancakeswap.finance/swap";
  const isPromotedStake = stake.token.symbol === "SLT";

  return (
    <StyledCard isActive={isPromotedStake}>
      <FarmCardInnerContainer>
        <CardHeading
          pid={stake.pid}
          stakeLabel={stakeLabel}
          multiplier={stake.multiplier}
          isCommunityStake={stake.isCommunity}
          token={stake.token}
        />
        {!removed && (
          <Flex justifyContent="space-between" alignItems="center">
            <Text color="text">APR:</Text>
            <Text
              color="text"
              bold
              style={{ display: "flex", alignItems: "center" }}
            >
              {stake.apr ? (
                <ApyButton
                  variant="text-and-button"
                  pid={stake.pid}
                  stakeSymbol={stake.stakeSymbol}
                  multiplier={stake.multiplier}
                  stakeLabel={stakeLabel}
                  tokenPriceBusd={stake.tokenPriceBusd}
                  getTokenLink={getTokenLink}
                  sltTokenPrice={sltTokenPrice}
                  apr={stake.apr}
                />
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </Text>
          </Flex>
        )}
        <Flex justifyContent="space-between">
          <Text color="text">Earn:</Text>
          <Text color="text" bold>
            {earnLabel}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text color="text">Deposit Fee:</Text>
          <Text color="text" bold>{`${
            stake.depositFeeBP ? stake.depositFeeBP / 100 : 0
          }%`}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text color="text">Withdrawal Fee:</Text>
          <Text color="text" bold>
            {stake.isWithdrawFee ? `0~3%` : `0%`}
          </Text>
        </Flex>
        <CardActionsContainer
          stake={stake}
          stakeLabel={stakeLabel}
          account={account}
          sltTokenPrice={sltTokenPrice}
          getTokenLink={getTokenLink}
          referrer={referrer}
        />
      </FarmCardInnerContainer>

      <ExpandingWrapper>
        <ExpandableSectionButton
          onClick={() => setShowExpandableSection(!showExpandableSection)}
          expanded={showExpandableSection}
        />
        {showExpandableSection && (
          <DetailsSection
            removed={removed}
            bscScanAddress={getBscScanLink(stake.tokenAddress, "address")}
            infoAddress={`/info/pool/${stake.tokenAddress}`}
            totalValueFormatted={totalValueFormatted}
            stakeLabel={stakeLabel}
            getTokenLink={getTokenLink}
          />
        )}
      </ExpandingWrapper>
    </StyledCard>
  );
};

export default StakeCard;
