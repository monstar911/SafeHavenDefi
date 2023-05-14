import React from "react";
import styled from "styled-components";
import {
  Flex,
  TooltipText,
  IconButton,
  useModal,
  CalculateIcon,
  Skeleton,
  useTooltip,
} from "@pancakeswap/uikit";
import RoiCalculatorModal from "../../../../components/RoiCalculatorModal";
import { getAprData } from "../../helpers";
import BigNumber from "bignumber.js";
import { displayNumber } from "../../../../utils/formatBalance";

const ApyLabelContainer = styled(Flex)`
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const ApyIconButton = styled(IconButton)`
  width: 24px;
  height: 24px;
  margin-left: 0;
  margin-bottom: 2px;
`;

const AprRow = ({ stake, performanceFee = 0 }) => {
  const { stakingToken, apr, earningTokenPrice } = stake;

  const tooltipContent =
    "APY includes compounding, APR doesn’t. This stake’s reward token is compounded automatically, so we show APY.";

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, {
    placement: "bottom-start",
  });

  const { apr: earningsPercentageToDisplay } = getAprData(
    stake,
    performanceFee
  );

  const apyModalLink = stakingToken.address
    ? `https://pancakeswap.finance/swap?outputCurrency=${stakingToken.address}`
    : "https://pancakeswap.finance/swap";

  const [onPresentApyModal] = useModal(
    <RoiCalculatorModal
      earningTokenPrice={new BigNumber(earningTokenPrice)}
      apr={apr}
      linkLabel={`Get ${stakingToken.symbol}`}
      linkHref={apyModalLink}
    />
  );

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <TooltipText color="text" ref={targetRef}>
        APR:
      </TooltipText>
      {!apr ? (
        <Skeleton width="82px" height="32px" />
      ) : (
        <ApyLabelContainer alignItems="center" onClick={onPresentApyModal}>
           {displayNumber(earningsPercentageToDisplay)}%
          <ApyIconButton
            variant="text"
            scale="sm"
            ml="4px"
          >
            <CalculateIcon color="text" width="18px" />
          </ApyIconButton>
        </ApyLabelContainer>
      )}
    </Flex>
  );
};

export default AprRow;
