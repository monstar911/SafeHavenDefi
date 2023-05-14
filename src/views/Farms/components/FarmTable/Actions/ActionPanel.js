import React from "react";
import styled, { keyframes, css } from "styled-components";
import { LinkExternal, Text, Flex } from "@pancakeswap/uikit";
import getLiquidityUrlPathParts from "../../../../../utils/getLiquidityUrlPathParts";
import { getAddress } from "../../../../../utils/addressHelpers";
import { getBscScanLink } from "../../../../../utils";
import { CoreTag, DualTag } from "../../../../../components/Tags";

import HarvestAction from "./HarvestAction";
import StakedAction from "./StakedAction";
import Apr from "../Apr";
import Multiplier from "../Multiplier";
import Liquidity from "../Liquidity";

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`;

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`;

const Container = styled.div`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: ${({ theme }) => theme.card.background};
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`;

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`;

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 16px;
  }

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
  }
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`;

const InfoContainer = styled.div`
  min-width: 200px;
`;

const ValueContainer = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`;

const ActionPanel = ({
  details,
  apr,
  multiplier,
  liquidity,
  userDataReady,
  expanded,
  referrer,
}) => {
  const farm = details;
  const isActive = farm.multiplier !== "0X";
  const { quoteToken, token, dual } = farm;
  const lpLabel =
    farm.lpSymbol && farm.lpSymbol.toUpperCase().replace("PANCAKE", "");
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  });
  const lpAddress = getAddress(farm.lpAddresses);
  const bsc = getBscScanLink(lpAddress, "address");

  return (
    <Container expanded={expanded}>
      <InfoContainer>
        {isActive && (
          <StakeContainer>
            <StyledLinkExternal
              href={`https://pancakeswap.finance/add/${liquidityUrlPathParts}`}
            >
              {`Get ${lpLabel}`}
            </StyledLinkExternal>
          </StakeContainer>
        )}
        <StyledLinkExternal href={bsc}>View Contract</StyledLinkExternal>
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
        <TagsContainer>
          {farm.pid < 6 && farm.pid >= 0 && <CoreTag />}
          {dual ? <DualTag /> : null}
        </TagsContainer>
      </InfoContainer>
      <ValueContainer>
        <ValueWrapper>
          <Text color="text">APR</Text>
          <Apr {...apr} />
        </ValueWrapper>
        <ValueWrapper>
          <Text color="text">Multiplier</Text>
          <Multiplier {...multiplier} />
        </ValueWrapper>
        <ValueWrapper>
          <Text color="text">Liquidity</Text>
          <Liquidity {...liquidity} />
        </ValueWrapper>
      </ValueContainer>
      <ActionContainer>
        <HarvestAction
          {...farm}
          userDataReady={userDataReady}
          referrer={referrer}
        />
        <StakedAction
          {...farm}
          userDataReady={userDataReady}
          lpLabel={lpLabel}
          referrer={referrer}
        />
      </ActionContainer>
    </Container>
  );
};

export default ActionPanel;
