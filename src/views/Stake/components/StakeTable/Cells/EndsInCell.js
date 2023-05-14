import React from "react";
import styled from "styled-components";
import { Flex, Link, Skeleton, Text, TimerIcon } from "@pancakeswap/uikit";
import { getBscScanLink } from "../../../../../utils";
import { useBlock } from "../../../../../store/slices/block-slice/hooks";
import Balance from "../../../../../components/Balance";
import { getStakeBlockInfo } from "../../../helpers";
import BaseCell, { CellContent } from "./BaseCell";

const StyledCell = styled(BaseCell)`
  flex: 2 0 100px;
`;

const EndsInCell = ({ stake }) => {
  const { totalStaked, startBlock, endBlock, isFinished } = stake;
  const { currentBlock } = useBlock();

  const {
    shouldShowBlockCountdown,
    blocksUntilStart,
    blocksRemaining,
    hasStakeStarted,
    blocksToDisplay,
  } = getStakeBlockInfo(stake, currentBlock);

  const renderBlocks = shouldShowBlockCountdown ? (
    <Flex alignItems="center">
      <Flex flex="1.3">
        <Balance fontSize="16px" value={blocksToDisplay} decimals={0} />
        <Text color="text" ml="4px" textTransform="lowercase">
          Blocks
        </Text>
      </Flex>
      <Flex flex="1">
        <Link
          external
          href={getBscScanLink(
            hasStakeStarted ? endBlock : startBlock,
            "countdown"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <TimerIcon ml="4px" />
        </Link>
      </Flex>
    </Flex>
  ) : (
    <Text color="text">-</Text>
  );

  const isLoadingPublicData =
    !totalStaked.gt(0) ||
    !currentBlock ||
    (!blocksRemaining && !blocksUntilStart);
  const showLoading = isLoadingPublicData && !isFinished;
  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="lightText" textAlign="left">
          {hasStakeStarted || !shouldShowBlockCountdown
            ? "Ends in"
            : "Starts in"}
        </Text>
        {showLoading ? <Skeleton width="80px" height="16px" /> : renderBlocks}
      </CellContent>
    </StyledCell>
  );
};

export default EndsInCell;
