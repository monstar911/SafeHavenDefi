import React from "react";
import styled, { keyframes, css } from "styled-components";
import { LinkExternal, Text } from "@pancakeswap/uikit";
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
  const stake = details;
  const isActive = stake.multiplier !== "0X";
  const { token, dual } = stake;
  const stakeLabel =
    stake.stakeSymbol && stake.stakeSymbol.toUpperCase().replace("PANCAKE", "");
  const bsc = getBscScanLink(token.address, "address");

  return (
    <Container expanded={expanded}>
      <InfoContainer>
        {isActive && (
          <StakeContainer>
            <StyledLinkExternal href={`https://pancakeswap.finance/swap/`}>
              {`Get ${stakeLabel}`}
            </StyledLinkExternal>
          </StakeContainer>
        )}
        <StyledLinkExternal href={bsc}>View Contract</StyledLinkExternal>
        <TagsContainer>
          {stake.pid === 19 && <CoreTag />}
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
          {...stake}
          userDataReady={userDataReady}
          referrer={referrer}
        />
        <StakedAction
          {...stake}
          userDataReady={userDataReady}
          stakeLabel={stakeLabel}
          referrer={referrer}
        />
      </ActionContainer>
    </Container>
  );
};

export default ActionPanel;
