import React from "react";
import styled from "styled-components";
import { HelpIcon, Text, Skeleton, useTooltip } from "@pancakeswap/uikit";

const ReferenceElement = styled.div`
  display: inline-block;
`;

const LiquidityWrapper = styled.div`
  min-width: 110px;
  font-weight: 600;
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

const Liquidity = ({ liquidity }) => {
  const displayLiquidity = liquidity ? (
    `$${Number(liquidity).toLocaleString(undefined, {
      maximumFractionDigits: 3,
    })}`
  ) : (
    <Skeleton width={60} />
  );
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    "Total value of the funds in this stake’s liquidity pool",
    { placement: "top-end", tooltipOffset: [20, 10] }
  );

  return (
    <Container>
      <LiquidityWrapper>
        <Text color="text">{displayLiquidity}</Text>
      </LiquidityWrapper>
      <ReferenceElement ref={targetRef}>
        <HelpIcon color="text" />
      </ReferenceElement>
      {tooltipVisible && tooltip}
    </Container>
  );
};

export default Liquidity;
