import React from "react";
import styled from "styled-components";
import { Card, CardBody, Flex, Text, Heading, Box } from "@pancakeswap/uikit";

const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.card.background};
`;

const StyledTitle = styled(Text)`
  font-size: 32px;
`;

const StyledHeading = styled(Heading)`
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
  }
`;

const StyledText = styled(Text)`
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    white-space: nowrap;
  }
`;

const TransactionTaxBox = () => {
  return (
    <>
      <StyledTitle mb="8px" textAlign="center">
        Transaction Tax
      </StyledTitle>
      <StyledCard>
        <CardBody>
          <Flex justifyContent="space-between">
            <Box mr="24px">
              <StyledHeading m="0" textAlign="center">
                HAVEN TOKEN
              </StyledHeading>
              <Flex justifyContent="center">
                <StyledHeading color="primary">Buy</StyledHeading>
                <StyledHeading style={{ whiteSpace: "nowrap" }}>
                  /Sell 13%
                </StyledHeading>
              </Flex>
              <Box>
                <Flex>
                  <StyledText color="primary" mr="4px">
                    7%
                  </StyledText>
                  <StyledText>- Ethereum Bep-20 Rewards</StyledText>
                </Flex>
                <Flex>
                  <StyledText color="primary" mr="4px">
                    4%
                  </StyledText>
                  <StyledText>- Marketing & Development</StyledText>
                </Flex>
                <Flex>
                  <StyledText color="primary" mr="4px">
                    1%
                  </StyledText>
                  <StyledText>- Buyback & Burn</StyledText>
                </Flex>
                <Flex>
                  <StyledText color="primary" mr="4px">
                    1%
                  </StyledText>
                  <StyledText>- Liquidity</StyledText>
                </Flex>
              </Box>
            </Box>
            <Box>
              <StyledHeading m="0" textAlign="center">
                SLT
              </StyledHeading>
              <Flex justifyContent="center">
                <StyledHeading color="primary">Buy</StyledHeading>
                <StyledHeading style={{ whiteSpace: "nowrap" }}>
                  /Sell 0%
                </StyledHeading>
              </Flex>
              <Box>
                <StyledText textAlign="center">-</StyledText>
                <StyledText textAlign="center">-</StyledText>
                <StyledText textAlign="center">-</StyledText>
                <StyledText textAlign="center">-</StyledText>
              </Box>
            </Box>
          </Flex>
        </CardBody>
      </StyledCard>
    </>
  );
};

export default TransactionTaxBox;
