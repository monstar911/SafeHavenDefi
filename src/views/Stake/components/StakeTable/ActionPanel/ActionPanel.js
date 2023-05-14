import React from "react";
import styled, { keyframes, css } from "styled-components";
import {
  Box,
  Button,
  Flex,
  HelpIcon,
  Link,
  LinkExternal,
  MetamaskIcon,
  Skeleton,
  Text,
  TimerIcon,
  useTooltip,
} from "@pancakeswap/uikit";
import { BASE_BSC_SCAN_URL } from "../../../../../constants";
import { getBscScanLink } from "../../../../../utils";
import { useBlock } from "../../../../../store/slices/block-slice/hooks";
import BigNumber from "bignumber.js";
import Balance from "../../../../../components/Balance";
import { ManualPoolTag } from "../../../../../components/Tags";
import { getAddress } from "../../../../../utils/addressHelpers";
import { BIG_ZERO } from "../../../../../utils/bigNumber";
import { registerToken } from "../../../../../utils/wallet";
import {
  getBalanceNumber,
  getFullDisplayBalance,
} from "../../../../../utils/formatBalance";
import { getStakeBlockInfo } from "../../../helpers";
import Harvest from "./Harvest";
import Stake from "./Stake";
import Apr from "../Apr";

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 700px;
  }
`;

const collapseAnimation = keyframes`
  from {
    max-height: 700px;
  }
  to {
    max-height: 0px;
  }
`;

const StyledActionPanel = styled.div`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: ${({theme}) => theme.card.background};
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  padding: 12px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
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

const InfoSection = styled(Box)`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  padding: 8px 8px;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0;
    flex-basis: 230px;
  }
`;

const ActionPanel = ({
  account,
  stake,
  userDataLoaded,
  expanded,
  breakpoints,
}) => {
  const {
    stakingToken,
    earningToken,
    totalStaked,
    startBlock,
    endBlock,
    stakingLimit,
    contractAddress,
    userData,
  } = stake;
  const stakeContractAddress = getAddress(contractAddress);
  const { currentBlock } = useBlock();
  const { isXs, isSm, isMd } = breakpoints;

  const {
    shouldShowBlockCountdown,
    blocksUntilStart,
    blocksRemaining,
    hasStakeStarted,
    blocksToDisplay,
  } = getStakeBlockInfo(stake, currentBlock);

  const isMetaMaskInScope = !!window.ethereum?.isMetaMask;
  const tokenAddress = earningToken.address || "";

  const stakingTokenBalance = userData?.stakingTokenBalance
    ? new BigNumber(userData.stakingTokenBalance)
    : BIG_ZERO;
  const stakedBalance = userData?.stakedBalance
    ? new BigNumber(userData.stakedBalance)
    : BIG_ZERO;
  const stakeStakingTokenBalance = stakedBalance.plus(stakingTokenBalance);

  const getTotalStakedBalance = () => {
    return getBalanceNumber(totalStaked, stakingToken.decimals);
  };

  const {
    targetRef: totalStakedTargetRef,
    tooltip: totalStakedTooltip,
    tooltipVisible: totalStakedTooltipVisible,
  } = useTooltip(
    `Total amount of ${stakingToken.symbol} staked in this stake`,
    {
      placement: "bottom",
    }
  );

  const manualTooltipText =
    "You must harvest and compound your earnings from this stake manually.";

  const {
    targetRef: tagTargetRef,
    tooltip: tagTooltip,
    tooltipVisible: tagTooltipVisible,
  } = useTooltip(manualTooltipText, {
    placement: "bottom-start",
  });

  const maxStakeRow = stakingLimit.gt(0) ? (
    <Flex mb="8px" justifyContent="space-between">
      <Text color="text">Max. stake per user:</Text>
      <Text color="text">{`${getFullDisplayBalance(
        stakingLimit,
        stakingToken.decimals,
        0
      )} ${stakingToken.symbol}`}</Text>
    </Flex>
  ) : null;

  const blocksRow =
    blocksRemaining || blocksUntilStart ? (
      <Flex mb="8px" justifyContent="space-between">
        <Text color="text">
          {hasStakeStarted ? "Ends in" : "Starts in"}:
        </Text>
        <Flex>
          <Link
            external
            href={getBscScanLink(
              hasStakeStarted ? endBlock : startBlock,
              "countdown"
            )}
          >
            <Balance
              fontSize="16px"
              value={blocksToDisplay}
              decimals={0}
              color="primary"
            />
            <Text ml="4px" color="primary" textTransform="lowercase">
              Blocks
            </Text>
            <TimerIcon ml="4px" color="primary" />
          </Link>
        </Flex>
      </Flex>
    ) : (
      <Skeleton width="56px" height="16px" />
    );

  const aprRow = (
    <Flex justifyContent="space-between" alignItems="center" mb="8px">
      <Text color="text">APR:</Text>
      <Apr
        stake={stake}
        showIcon
        stakedBalance={stakeStakingTokenBalance}
        performanceFee={0}
      />
    </Flex>
  );

  const totalStakedRow = (
    <Flex justifyContent="space-between" alignItems="center" mb="8px">
      <Text color="text" maxWidth={["50px", "100%"]}>
        Total staked:
      </Text>
      <Flex alignItems="center">
        {totalStaked && totalStaked.gte(0) ? (
          <>
            <Balance
              fontSize="16px"
              value={getTotalStakedBalance()}
              decimals={0}
              unit={` ${stakingToken.symbol}`}
            />
            <span ref={totalStakedTargetRef}>
              <HelpIcon color="lightText" width="20px" ml="4px" />
            </span>
          </>
        ) : (
          <Skeleton width="56px" height="16px" />
        )}
        {totalStakedTooltipVisible && totalStakedTooltip}
      </Flex>
    </Flex>
  );

  return (
    <StyledActionPanel expanded={expanded}>
      <InfoSection>
        {maxStakeRow}
        {(isXs || isSm) && aprRow}
        {(isXs || isSm || isMd) && totalStakedRow}
        {shouldShowBlockCountdown && blocksRow}
        <Flex mb="8px" justifyContent={["flex-end", "flex-end", "flex-start"]}>
          <LinkExternal href={earningToken.projectLink} bold={false}>
            View Project Site
          </LinkExternal>
        </Flex>
        {stakeContractAddress && (
          <Flex
            mb="8px"
            justifyContent={["flex-end", "flex-end", "flex-start"]}
          >
            <LinkExternal
              href={`${BASE_BSC_SCAN_URL}/address/${stakeContractAddress}`}
              bold={false}
            >
              View Contract
            </LinkExternal>
          </Flex>
        )}
        {account && isMetaMaskInScope && tokenAddress && (
          <Flex
            mb="8px"
            justifyContent={["flex-end", "flex-end", "flex-start"]}
          >
            <Button
              variant="text"
              p="0"
              height="auto"
              onClick={() =>
                registerToken(
                  tokenAddress,
                  earningToken.symbol,
                  earningToken.decimals
                )
              }
            >
              <Text color="primary">Add to Metamask</Text>
              <MetamaskIcon ml="4px" />
            </Button>
          </Flex>
        )}
        <ManualPoolTag />
        {tagTooltipVisible && tagTooltip}
        <span ref={tagTargetRef}>
          <HelpIcon ml="4px" width="20px" height="20px" color="lightText" />
        </span>
      </InfoSection>
      <ActionContainer>
        <Text mt="4px" mb="16px" color="lightText">
          {`${"Earn"} SLT ${"Stake".toLocaleLowerCase()} SLT`}
        </Text>
        <Harvest {...stake} userDataLoaded={userDataLoaded} />
        <Stake stake={stake} userDataLoaded={userDataLoaded} />
      </ActionContainer>
    </StyledActionPanel>
  );
};

export default ActionPanel;
