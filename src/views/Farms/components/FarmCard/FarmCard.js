import React, { useState } from "react";
import styled from "styled-components";
import { Card, Flex, Text, Skeleton } from "@pancakeswap/uikit";
import { getBscScanLink } from "../../../../utils";
import ExpandableSectionButton from "../../../../components/ExpandableSectionButton";
import { getAddress } from "../../../../utils/addressHelpers";
import getLiquidityUrlPathParts from "../../../../utils/getLiquidityUrlPathParts";
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

const FarmCard = ({ farm, removed, sltTokenPrice, account, referrer }) => {
  const [showExpandableSection, setShowExpandableSection] = useState(false);

  const totalValueFormatted = farm.liquidity
    ? `$${farm.liquidity
        .toNumber()
        .toLocaleString(undefined, { maximumFractionDigits: 4 })}`
    : "";

  const lpLabel =
    farm.lpSymbol && farm.lpSymbol.toUpperCase().replace("PANCAKE", "");
  const earnLabel = farm.dual ? farm.dual.earnLabel : "SLT";

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  });
  const addLiquidityUrl = `https://pancakeswap.finance/add/${liquidityUrlPathParts}`;
  const lpAddress = getAddress(farm.lpAddresses);
  const isPromotedFarm = farm.token.symbol === "SLT";

  return (
    <StyledCard isActive={isPromotedFarm}>
      <FarmCardInnerContainer>
        <CardHeading
          pid={farm.pid}
          lpLabel={lpLabel}
          multiplier={farm.multiplier}
          isCommunityFarm={farm.isCommunity}
          token={farm.token}
          quoteToken={farm.quoteToken}
        />
        {!removed && (
          <Flex justifyContent="space-between" alignItems="center">
            <Text color="text">APR:</Text>
            <Text
              color="text"
              bold
              style={{ display: "flex", alignItems: "center" }}
            >
              {farm.apr || farm.apr === 0 ? (
                <ApyButton
                  variant="text-and-button"
                  pid={farm.pid}
                  lpSymbol={farm.lpSymbol}
                  multiplier={farm.multiplier}
                  lpLabel={lpLabel}
                  addLiquidityUrl={addLiquidityUrl}
                  sltTokenPrice={sltTokenPrice}
                  apr={farm.apr}
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
            farm.depositFeeBP ? farm.depositFeeBP / 100 : 0
          }%`}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text color="text">Withdrawal Fee:</Text>
          <Text color="text" bold>
            {farm.isWithdrawFee ? `0~3%` : `0%`}
          </Text>
        </Flex>
        <CardActionsContainer
          farm={farm}
          lpLabel={lpLabel}
          account={account}
          sltTokenPrice={sltTokenPrice}
          addLiquidityUrl={addLiquidityUrl}
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
            bscScanAddress={getBscScanLink(lpAddress, "address")}
            infoAddress={`/#/info/pool/${lpAddress}`}
            totalValueFormatted={totalValueFormatted}
            lpLabel={lpLabel}
            addLiquidityUrl={addLiquidityUrl}
          />
        )}
      </ExpandingWrapper>
    </StyledCard>
  );
};

export default FarmCard;
