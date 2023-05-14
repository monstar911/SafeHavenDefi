import React from "react";
import styled from "styled-components";
import { Tag, Flex, Heading, Skeleton } from "@pancakeswap/uikit";
import { CoreTag } from "../../../../components/Tags";
import tokens from "../../../../constants/tokens";

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
  stakeLabel,
  multiplier,
  isCommunityStake,
  token,
}) => {
  const getImageUrlFromToken = (token) => {
    const address =
      token.symbol === "WBNB" ? tokens.wbnb.address : token.address;
    return `/images/tokens/${address}.png`;
  };

  return (
    <CardHeadingWrapper
      justifyContent="space-between"
      alignItems="center"
      mb="12px"
    >
      <img src={getImageUrlFromToken(token)} width={64} height={64} alt="" />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading color="text" mb="4px" style={{ whiteSpace: 'nowrap' }}>
          {stakeLabel.split(" ")[0]}
        </Heading>
        <Flex justifyContent="center">
          {pid === 19 && <CoreTag />}
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
