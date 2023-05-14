import React from "react";
import styled from "styled-components";
import {
  Skeleton,
  Text,
  Flex,
  Box,
  useModal,
  useMatchBreakpoints,
} from "@pancakeswap/uikit";
import BigNumber from "bignumber.js";
import { BIG_ZERO } from "../../../../../utils/bigNumber";
import {
  formatNumber,
  getBalanceNumber,
} from "../../../../../utils/formatBalance";
import Balance from "../../../../../components/Balance";
import BaseCell, { CellContent } from "./BaseCell";
import CollectModal from "../../StakeCard/Modals/CollectModal";

const StyledCell = styled(BaseCell)`
  flex: 4.5;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 120px;
  }
`;

const EarningsCell = ({ stake, account, userDataLoaded }) => {
  const { isMobile } = useMatchBreakpoints();
  const { sousId, earningToken, userData, earningTokenPrice } = stake;

  const earnings = userData?.pendingReward
    ? new BigNumber(userData.pendingReward)
    : BIG_ZERO;
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals);
  const earningTokenDollarBalance = getBalanceNumber(
    earnings.multipliedBy(earningTokenPrice),
    earningToken.decimals
  );
  const hasEarnings = account && earnings.gt(0);
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3);

  const labelText = `${earningToken.symbol} Earned`;

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      earningsDollarValue={earningTokenDollarBalance}
      earningToken={earningToken}
      sousId={sousId}
    />
  );

  const handleEarningsClick = (event) => {
    event.stopPropagation();
    onPresentCollect();
  };

  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="lightText" textAlign="left">
          {labelText}
        </Text>
        {!userDataLoaded && account ? (
          <Skeleton width="80px" height="16px" />
        ) : (
          <>
            <Flex>
              <Box
                mr="8px"
                height="32px"
                onClick={hasEarnings ? handleEarningsClick : undefined}
              >
                <Balance
                  mt="4px"
                  bold={!isMobile}
                  fontSize={isMobile ? "14px" : "16px"}
                  color={hasEarnings ? "primary" : "textDisabled"}
                  decimals={hasEarnings ? 5 : 1}
                  value={hasEarnings ? earningTokenBalance : 0}
                />
                {hasEarnings ? (
                  <>
                    {earningTokenPrice > 0 && (
                      <Balance
                        display="inline"
                        fontSize="12px"
                        color="lightText"
                        decimals={2}
                        prefix="~"
                        value={earningTokenDollarBalance}
                        unit=" USD"
                      />
                    )}
                  </>
                ) : (
                  <Text mt="4px" fontSize="12px" color="textDisabled">
                    0 USD
                  </Text>
                )}
              </Box>
            </Flex>
          </>
        )}
      </CellContent>
    </StyledCell>
  );
};

export default EarningsCell;
