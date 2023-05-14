import React from "react";
import styled from "styled-components";
import { Tag, Flex, Heading, Skeleton } from "@pancakeswap/uikit";
import { CoreTag } from "../../../../components/Tags";
import { TokenPairImage } from "../../../../components/TokenImage";

const CardHeadingWrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`;

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`;

const CardHeading = ({
  pid,
  lpLabel,
  multiplier,
  isCommunityFarm,
  token,
  quoteToken,
}) => {
  return (
    <CardHeadingWrapper
      justifyContent="space-between"
      alignItems="center"
      mb="12px"
    >
      <TokenPairImage
        variant="inverted"
        primaryToken={token}
        secondaryToken={quoteToken}
        width={64}
        height={64}
      />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading color="text" mb="4px" style={{ whiteSpace: "nowrap" }}>
          {lpLabel.split(" ")[0]}
        </Heading>
        <Flex justifyContent="center">
          {pid < 2 && pid >= 0 && <CoreTag />}
          {multiplier ? (
            <MultiplierTag variant="primary">
              {multiplier}
            </MultiplierTag>
          ) : (
            <Skeleton ml="4px" width={42} height={28} />
          )}
        </Flex>
      </Flex>
    </CardHeadingWrapper>
  );
};

export default CardHeading;
