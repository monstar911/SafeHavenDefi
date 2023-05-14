import React from "react";
import styled from "styled-components";
import ApyButton from "../FarmCard/ApyButton";
import getLiquidityUrlPathParts from "../../../../utils/getLiquidityUrlPathParts";
import { Skeleton } from "@pancakeswap/uikit";
import { displayNumber } from "../../../../utils/formatBalance";

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({theme}) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;
  }
`;

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
`;

const Apr = ({
  value,
  pid,
  lpLabel,
  lpSymbol,
  multiplier,
  tokenAddress,
  quoteTokenAddress,
  sltTokenPrice,
  originalValue,
  hideButton = false,
}) => {
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress,
    tokenAddress,
  });
  const addLiquidityUrl = `https://pancakeswap.finance/add/${liquidityUrlPathParts}`;

  return originalValue !== 0 ? (
    <Container>
      {originalValue ? (
        <ApyButton
          variant={hideButton ? "primary" : "text-and-button"}
          pid={pid}
          lpSymbol={lpSymbol}
          lpLabel={lpLabel}
          multiplier={multiplier}
          sltTokenPrice={sltTokenPrice}
          apr={originalValue}
          addLiquidityUrl={addLiquidityUrl}
        />
      ) : (
        <AprWrapper>
          <Skeleton width={60} />
        </AprWrapper>
      )}
    </Container>
  ) : (
    <Container>
      <AprWrapper>{displayNumber(originalValue)}%</AprWrapper>
    </Container>
  );
};

export default Apr;
