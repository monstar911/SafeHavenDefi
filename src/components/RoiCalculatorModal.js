import React from "react";
import styled from "styled-components";
import { Modal, Text, Flex, LinkExternal, Skeleton } from "@pancakeswap/uikit";
import BigNumber from "bignumber.js";
import {
  calculateSltEarnedPerThousandDollars,
  apyModalRoi,
} from "../utils/compoundApyHelpers";
import { displayNumber } from "../utils/formatBalance";

const StyledModal = styled(Modal)`
  width: 450px;
  & > :nth-child(2) {
    padding: 0;
  }
`;

const ScrollableContainer = styled.div`
  padding: 24px;
  max-height: 500px;
  overflow-y: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`;

const RoiCalculatorModal = ({
  onDismiss,
  onBack,
  earningTokenPrice,
  apr,
  linkLabel,
  linkHref,
}) => {
  const farmApr = new BigNumber(apr).times(new BigNumber(100)).toNumber();
  const oneThousandDollarsWorthOfSlt = 1000 / earningTokenPrice.toNumber();

  const sltEarnedPerThousand1D = calculateSltEarnedPerThousandDollars({
    numberOfDays: 1,
    farmApr,
    earningTokenPrice: earningTokenPrice.toNumber(),
  });
  const sltEarnedPerThousand7D = calculateSltEarnedPerThousandDollars({
    numberOfDays: 7,
    farmApr,
    earningTokenPrice: earningTokenPrice.toNumber(),
  });
  const sltEarnedPerThousand30D = calculateSltEarnedPerThousandDollars({
    numberOfDays: 30,
    farmApr,
    earningTokenPrice: earningTokenPrice.toNumber(),
  });
  const sltEarnedPerThousand365D = calculateSltEarnedPerThousandDollars({
    numberOfDays: 365,
    farmApr,
    earningTokenPrice: earningTokenPrice.toNumber(),
  });
  return (
    <StyledModal
      title={"ROI"}
      onDismiss={onBack || onDismiss}
      onBack={onBack || null}
      headerBackground="gradients.cardHeader"
    >
      <ScrollableContainer>
        <Flex justifyContent="space-between" mb="12px">
          <Text color="text" width="33.33%">
            APR
          </Text>
          <Text width="33.33%"></Text>
          <Text color="text" width="33.33%">
            {displayNumber(apr)}%
          </Text>
        </Flex>
        <Flex justifyContent="space-between" mb="12px">
          <Text color="primary" width="33.33%">
            TIMEFRAME
          </Text>
          <Text color="primary" width="33.33%">
            ROI
          </Text>
          <Text color="primary" width="33.33%">
            SLT PER $1000
          </Text>
        </Flex>
        <Flex justifyContent="space-between" mb="8px">
          <Text color="text" width="33.33%">
            1d
          </Text>
          <Text color="text" width="33.33%">
            {earningTokenPrice.toNumber() ? (
              `${apyModalRoi({
                amountEarned: sltEarnedPerThousand1D,
                amountInvested: oneThousandDollarsWorthOfSlt,
              })}%`
            ) : (
              <Skeleton width={100} />
            )}
          </Text>
          <Text color="text" width="33.33%">
            {earningTokenPrice.toNumber() ? (
              displayNumber(sltEarnedPerThousand1D)
            ) : (
              <Skeleton width={100} />
            )}
          </Text>
        </Flex>
        <Flex justifyContent="space-between" mb="8px">
          <Text color="text" width="33.33%">
            7d
          </Text>
          <Text color="text" width="33.33%">
            {earningTokenPrice.toNumber() ? (
              `${apyModalRoi({
                amountEarned: sltEarnedPerThousand7D,
                amountInvested: oneThousandDollarsWorthOfSlt,
              })}%`
            ) : (
              <Skeleton width={100} />
            )}
          </Text>
          <Text color="text" width="33.33%">
            {earningTokenPrice.toNumber() ? (
              displayNumber(sltEarnedPerThousand7D)
            ) : (
              <Skeleton width={100} />
            )}
          </Text>
        </Flex>
        <Flex justifyContent="space-between" mb="8px">
          <Text color="text" width="33.33%">
            30d
          </Text>
          <Text color="text" width="33.33%">
            {earningTokenPrice.toNumber() ? (
              `${apyModalRoi({
                amountEarned: sltEarnedPerThousand30D,
                amountInvested: oneThousandDollarsWorthOfSlt,
              })}%`
            ) : (
              <Skeleton width={100} />
            )}
          </Text>
          <Text color="text" width="33.33%">
            {earningTokenPrice.toNumber() ? (
              displayNumber(sltEarnedPerThousand30D)
            ) : (
              <Skeleton width={100} />
            )}
          </Text>
        </Flex>
        <Flex justifyContent="space-between" mb="20px">
          <Text color="text" width="33.33%">
            365d(APY)
          </Text>
          <Text color="text" width="33.33%">
            {earningTokenPrice.toNumber() ? (
              `${apyModalRoi({
                amountEarned: sltEarnedPerThousand365D,
                amountInvested: oneThousandDollarsWorthOfSlt,
              })}%`
            ) : (
              <Skeleton width={100} />
            )}
          </Text>
          <Text color="text" width="33.33%">
            {earningTokenPrice.toNumber() ? (
              displayNumber(sltEarnedPerThousand365D)
            ) : (
              <Skeleton width={100} />
            )}
          </Text>
        </Flex>
        <Text fontSize="14px" color="text">
          Calculated based on current rates. Compounding once daily. Rates are
          estimates provided for your convenience only, and by no means
          represent guaranteed returns.
        </Text>
        <Flex justifyContent="center" mt="24px">
          <LinkExternal href={linkHref}>{linkLabel}</LinkExternal>
        </Flex>
      </ScrollableContainer>
    </StyledModal>
  );
};

export default RoiCalculatorModal;
