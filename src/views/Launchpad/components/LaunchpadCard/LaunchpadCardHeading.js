import React from "react";
import { Flex, Text } from "@pancakeswap/uikit";
import tokens from "../../../../constants/tokens";

const LaunchpadCardHeading = ({ tokenLabel, token }) => {
  const getImageUrlFromToken = (token) => {
    const address =
      token.symbol === "WBNB" ? tokens.wbnb.address : token.address;
    return `/images/tokens/${address}.png`;
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" mb="24px">
      <img src={getImageUrlFromToken(token)} width={64} height={64} alt="" />
      <Text color="text" bold mb="4px" fontSize="24px">
        {tokenLabel.split(" ")[0]}
      </Text>
    </Flex>
  );
};

export default LaunchpadCardHeading;
