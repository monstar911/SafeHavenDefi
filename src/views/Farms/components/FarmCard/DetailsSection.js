import React from "react";
import styled from "styled-components";
import { Text, Flex, LinkExternal, Skeleton } from "@pancakeswap/uikit";

const DetailsSectionWrapper = styled.div`
  margin-top: 24px;
`;

const TotalLiquidity = styled(Flex)`
  justify-content: space-between;
  margin-bottom: 8px;
`;

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`;

const DetailsSection = ({
  bscScanAddress,
  infoAddress,
  removed,
  totalValueFormatted,
  lpLabel,
  addLiquidityUrl,
}) => {
  return (
    <DetailsSectionWrapper>
      <TotalLiquidity>
        <Text color="text">Total Liquidity:</Text>
        {totalValueFormatted || totalValueFormatted === 0 ? (
          <Text color="text">{totalValueFormatted}</Text>
        ) : (
          <Skeleton width={75} height={25} />
        )}
      </TotalLiquidity>
      {!removed && (
        <StyledLinkExternal href={addLiquidityUrl}>
          {`Get ${lpLabel}`}
        </StyledLinkExternal>
      )}
      <StyledLinkExternal href={bscScanAddress}>
        View Contract
      </StyledLinkExternal>
    </DetailsSectionWrapper>
  );
};

export default DetailsSection;
