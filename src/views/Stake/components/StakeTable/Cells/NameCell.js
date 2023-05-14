import React from "react";
import styled from "styled-components";
import BigNumber from "bignumber.js";
import { Text, useMatchBreakpoints } from "@pancakeswap/uikit";
import { BIG_ZERO } from "../../../../../utils/bigNumber";
import { TokenPairImage } from "../../../../../components/TokenImage";
import BaseCell, { CellContent } from "./BaseCell";

const StyledCell = styled(BaseCell)`
  flex: 5;
  flex-direction: row;
  padding-left: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 150px;
    padding-left: 32px;
  }
`;

const NameCell = ({ stake }) => {
  const { isMobile } = useMatchBreakpoints();
  const { stakingToken, earningToken, userData, isFinished } = stake;

  const stakingTokenSymbol = stakingToken.symbol;
  const earningTokenSymbol = earningToken.symbol;

  const stakedBalance = userData?.stakedBalance
    ? new BigNumber(userData.stakedBalance)
    : BIG_ZERO;
  const isStaked = stakedBalance.gt(0);
  const showStakedTag = isStaked;

  let title = `${"Earn"} ${earningTokenSymbol}`;
  let subtitle = `${"Stake"} ${stakingTokenSymbol}`;

  return (
    <StyledCell role="cell">
      <TokenPairImage
        primaryToken={earningToken}
        secondaryToken={stakingToken}
        mr="8px"
        width={40}
        height={40}
      />
      <CellContent>
        {showStakedTag && (
          <Text
            fontSize="12px"
            bold
            color={isFinished ? "failure" : "text"}
            textTransform="uppercase"
          >
            {"Staked"}
          </Text>
        )}
        <Text color="text" bold={!isMobile} small={isMobile}>
          {title}
        </Text>
        <Text fontSize="12px" color="lightText">
          {subtitle}
        </Text>
      </CellContent>
    </StyledCell>
  );
};

export default NameCell;
