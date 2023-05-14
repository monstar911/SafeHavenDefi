import React from "react";
import styled from "styled-components";
import {
  Flex,
  useModal,
  CalculateIcon,
  Skeleton,
  IconButton,
} from "@pancakeswap/uikit";
import RoiCalculatorModal from "../../../../components/RoiCalculatorModal";
import { getAprData } from "../../helpers";
import BigNumber from "bignumber.js";
import { displayNumber } from "../../../../utils/formatBalance";

const AprLabelContainer = styled(Flex)`
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

const Apr = ({
  stake,
  showIcon,
  stakedBalance,
  performanceFee = 0,
  ...props
}) => {
  const { stakingToken, isFinished, earningTokenPrice, apr } = stake;

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

  const openRoiModal = (event) => {
    event.stopPropagation();
    onPresentApyModal();
  };

  return (
    <AprLabelContainer
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      {earningsPercentageToDisplay || isFinished ? (
        <Flex alignItems="center" onClick={openRoiModal}>
          {displayNumber(earningsPercentageToDisplay)}%
          <ApyIconButton
            variant="text"
            scale="sm"
            ml="4px"
          >
            <CalculateIcon color="text" width="18px" />
          </ApyIconButton>
        </Flex>
      ) : (
        <Skeleton width="80px" height="16px" />
      )}
    </AprLabelContainer>
  );
};

export default Apr;
