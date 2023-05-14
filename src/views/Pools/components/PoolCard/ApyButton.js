import React from "react";
import styled from "styled-components";
import { IconButton, useModal, CalculateIcon } from "@pancakeswap/uikit";
import RoiCalculatorModal from "../../../../components/RoiCalculatorModal";
import { displayNumber } from "../../../../utils/formatBalance";

const ApyLabelContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;

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

const ApyButton = ({
  variant,
  stakeLabel,
  sltTokenPrice,
  apr,
  getTokenLink,
}) => {
  const [onPresentApyModal] = useModal(
    <RoiCalculatorModal
      linkLabel={`Get ${stakeLabel}`}
      earningTokenPrice={sltTokenPrice}
      apr={apr}
      linkHref={getTokenLink}
    />
  );

  const handleClickButton = (event) => {
    event.stopPropagation();
    onPresentApyModal();
  };

  return (
    <ApyLabelContainer onClick={handleClickButton}>
      {displayNumber(apr)}%
      {variant === "text-and-button" && (
        <ApyIconButton
          variant="text"
          scale="sm"
          ml="4px"
        >
          <CalculateIcon color="text" width="18px" />
        </ApyIconButton>
      )}
    </ApyLabelContainer>
  );
};

export default ApyButton;
