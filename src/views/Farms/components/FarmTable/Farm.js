import React from "react";
import styled from "styled-components";
import { useFarmUser } from "../../../../store/slices/farms-slice/hooks";
import { Text } from "@pancakeswap/uikit";
import { getBalanceNumber } from "../../../../utils/formatBalance";
import { TokenPairImage } from "../../../../components/TokenImage";

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`;

const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40px;
  }
`;

const Farm = ({ token, quoteToken, label, pid }) => {
  const { stakedBalance } = useFarmUser(pid);
  const rawStakedBalance = getBalanceNumber(stakedBalance);

  const handleRenderFarming = () => {
    if (rawStakedBalance) {
      return (
        <Text color="text" fontSize="12px" bold textTransform="uppercase">
          Farming
        </Text>
      );
    }

    return null;
  };

  return (
    <Container>
      <TokenWrapper>
        <TokenPairImage
          variant="inverted"
          primaryToken={token}
          secondaryToken={quoteToken}
          width={40}
          height={40}
        />
      </TokenWrapper>
      <div>
        {handleRenderFarming()}
        <Text color="text" bold>
          {label}
        </Text>
      </div>
    </Container>
  );
};

export default Farm;
