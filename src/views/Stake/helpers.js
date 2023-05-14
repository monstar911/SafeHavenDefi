const MANUAL_STAKE_AUTO_COMPOUND_FREQUENCY = 0;

export const getAprData = (stake, performanceFee) => {
  const { apr } = stake;

  const autoCompoundFrequency = MANUAL_STAKE_AUTO_COMPOUND_FREQUENCY;

  return { apr, autoCompoundFrequency };
};

export const getStakeBlockInfo = (stake, currentBlock) => {
  const { startBlock, endBlock, isFinished } = stake;
  const shouldShowBlockCountdown = Boolean(
    !isFinished && startBlock && endBlock
  );
  const blocksUntilStart = Math.max(startBlock - currentBlock, 0);
  const blocksRemaining = Math.max(endBlock - currentBlock, 0);
  const hasStakeStarted = blocksUntilStart === 0 && blocksRemaining > 0;
  const blocksToDisplay = hasStakeStarted ? blocksRemaining : blocksUntilStart;
  return {
    shouldShowBlockCountdown,
    blocksUntilStart,
    blocksRemaining,
    hasStakeStarted,
    blocksToDisplay,
  };
};
