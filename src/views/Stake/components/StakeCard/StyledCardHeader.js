import React from "react";
import { CardHeader, Heading, Text, Flex } from "@pancakeswap/uikit";
import styled from "styled-components";
import { TokenPairImage } from "../../../../components/TokenImage";

const Wrapper = styled(CardHeader)`
  background: transparent;
  border-radius: ${({ theme }) =>
    `${theme.radii.card} ${theme.radii.card} 0 0`};
`;

const StyledCardHeader = ({
  earningToken,
  stakingToken,
  isFinished = false,
  isStaking = false,
}) => {
  const background = isStaking ? "bubblegum" : "cardHeader";

  const getSubHeading = () => {
    return `Stake ${stakingToken.symbol}`;
  };

  return (
    <Wrapper isFinished={isFinished} background={background}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading color={isFinished ? "textDisabled" : "body"} scale="lg">
            {`Earn ${earningToken.symbol}`}
          </Heading>
          <Text color={isFinished ? "textDisabled" : "lightText"}>
            {getSubHeading()}
          </Text>
        </Flex>
        <TokenPairImage
          primaryToken={earningToken}
          secondaryToken={stakingToken}
          width={64}
          height={64}
        />
      </Flex>
    </Wrapper>
  );
};

export default StyledCardHeader;
