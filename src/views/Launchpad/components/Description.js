import React from "react";
import styled from "styled-components";
import { Card, CardBody, Flex, Text } from "@pancakeswap/uikit";

const StyledLaunchpadCard = styled(Card)`
  background: ${({ theme }) => theme.card.background};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  width: 100%;
  padding: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 48%;
    margin-bottom: 0;
  }
`;

const Title = styled(Text)`
  font-size: 28px;
  line-height: 32px;
  font-weight: 400;
  letter-spacing: 0.25px;
  text-transform: uppercase;
  margin-bottom: 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 34px;
    line-height: 40px;
  }
`;

const SubTitle = styled(Text)`
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 4px;
`;

const ContentBox = styled.div`
  margin-bottom: 16px;
`;

const TableContainer = styled.div`
  overflow: auto;
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888888;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
`;

const StyledTable = styled.table`
  min-width: 415px;
  border-collapse: collapse;
  text-align: center;
`;

const TableCellHead = styled.th`
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.tableBorder};
  padding: 8px 12px;
`;

const TableCell = styled.td`
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.tableBorder};
  padding: 8px 12px;
`;

const Description = () => {
  return (
    <Flex justifyContent="space-between" flexWrap="wrap">
      <StyledLaunchpadCard>
        <CardBody>
          <Title>⚡️PreSale Infomation⚡️</Title>
          <ContentBox>
            <Text fontWeight="700">1. DATE & TIME:</Text>
            <Text>⏳Private Sale Starts: May 10th, 2022 @ 7PM UTC</Text>
            <Text>⏳Private Sale Ends: May 17th, 2022 @ 7PM UTC</Text>
            <Text>⏳Pinksale Presale starts: May 18th, 2022 @ 7PM UTC</Text>
            <Text>⏳PancakeSwap Launch: May 19th, 2022 @ 8PM UTC</Text>
          </ContentBox>
          <ContentBox>
            <Text fontWeight="700">2. TOKEN INFORMATION</Text>
            <Text>Initial Supply: 350,000</Text>
            <Text>Initial Marketcap: $490,000</Text>
            <Text>Initial Liquidity: 55% of raised funds through pinksale sale</Text>
            <Text>Total to Be Raised: 285,000 USD (600 BNB + 40,000 BUSD)</Text>
            <Text>Total to Be Sold: 232,810 SLT</Text>
          </ContentBox>
          <ContentBox>
            <Text fontWeight="700">3. PRICES</Text>
            <Text>Listing Price: 1 SLT = $1.40</Text>
            <Text>Pinksale Presale Price: 1 SLT = $1.27</Text>
            <Text>Haven Holders Private Sale - 1k+ holders = $1.16</Text>
            <Text>Haven Holders Private Sale - 10k+ holders = $1.08</Text>
          </ContentBox>
          <ContentBox>
            <Text fontWeight="700">4. POOLS:</Text>
            <Text>
              The different pools which are based on the Haven holding and the
              amount in BUSD/WBNB to be raised are specified below:
            </Text>
            <TableContainer>
              <StyledTable>
                <thead>
                  <tr>
                    <TableCellHead>Pools</TableCellHead>
                    <TableCellHead>SLT to be sold</TableCellHead>
                    <TableCellHead>SLT Price/Token</TableCellHead>
                    <TableCellHead>BNB Value</TableCellHead>
                    <TableCellHead>BUSD Value</TableCellHead>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <TableCell>Pinksale Presale</TableCell>
                    <TableCell>198,000 SLT</TableCell>
                    <TableCell>0.0031 BNB</TableCell>
                    <TableCell>600</TableCell>
                    <TableCell>244,284</TableCell>
                  </tr>
                  <tr>
                    <TableCell>Haven holders+</TableCell>
                    <TableCell>21,440 SLT</TableCell>
                    <TableCell>1.16 BUSD</TableCell>
                    <TableCell>#</TableCell>
                    <TableCell>25,000</TableCell>
                  </tr>
                  <tr>
                    <TableCell>Haven whales+</TableCell>
                    <TableCell>13,370 SLT</TableCell>
                    <TableCell>1.08 BUSD</TableCell>
                    <TableCell>#</TableCell>
                    <TableCell>15,000</TableCell>
                  </tr>
                </tbody>
              </StyledTable>
            </TableContainer>
          </ContentBox>
        </CardBody>
      </StyledLaunchpadCard>
      <StyledLaunchpadCard>
        <CardBody>
          <Title>How to Participate</Title>
          <ContentBox>
            <Text>The participation mode are in two formats:</Text>
            <Text ml="16px">1. Haven Holders</Text>
            <Text ml="16px">2. Non Haven Holders</Text>
          </ContentBox>
          <ContentBox>
            <SubTitle>Haven Holders (private sale)</SubTitle>
            <Text>
              The pool you belong to is dependent on the amount of the Haven you
              are holding. See the pools table for a detailed breakdown. Once
              the presale starts, use the same wallet where you are holding your
              Haven to make your contribution.
            </Text>
          </ContentBox>
          <ContentBox>
            <SubTitle>Non Haven Holders</SubTitle>
            <Text>
              Non Haven Holders can participate on the Whitelist presale through
              Pinksale. The link to the presale will be posted on our social
              media platforms on or before the presale starts.
            </Text>
          </ContentBox>
          <ContentBox>
            <SubTitle>TOKEN CLAIM</SubTitle>
            <Text>
              Once the sale is over, you can claim your bought tokens and any
              unspent BUSD or WBNB will be refunded.
            </Text>
          </ContentBox>
        </CardBody>
      </StyledLaunchpadCard>
    </Flex>
  );
};

export default Description;
