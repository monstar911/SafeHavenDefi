import React from "react";
import styled from "styled-components";
import { Text, HelpIcon, Skeleton, useTooltip } from "@pancakeswap/uikit";

const ReferenceElement = styled.div`
  display: inline-block;
`;

const MultiplierWrapper = styled.div`
  color: ${({theme}) => theme.colors.text};
  width: 36px;
  text-align: right;
  margin-right: 14px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 0;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Multiplier = ({ multiplier }) => {
  const displayMultiplier = multiplier ? (
    multiplier.toLowerCase()
  ) : (
    <Skeleton width={30} />
  );
  const tooltipContent = (
    <>
      <Text color="textColor">
        The Multiplier represents the proportion of SLT rewards each farm
        receives, as a proportion of the SLT produced each block.
      </Text>
      <Text color="textColor" my="24px">
        For example, if a 1x farm received 1 SLT per block, a 40x farm would
        receive 40 SLT per block.
      </Text>
      <Text color="textColor">
        This amount is already included in all APR calculations for the farm.
      </Text>
    </>
  );
  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, {
    placement: "top-end",
    tooltipOffset: [20, 10],
  });

  return (
    <Container>
      <MultiplierWrapper>{displayMultiplier}</MultiplierWrapper>
      <ReferenceElement ref={targetRef}>
        <HelpIcon color="text" />
      </ReferenceElement>
      {tooltipVisible && tooltip}
    </Container>
  );
};

export default Multiplier;
