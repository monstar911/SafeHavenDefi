import React from "react";
import { Text } from "@pancakeswap/uikit";
import { useWeb3React } from "@web3-react/core";

const SltHarvestBalance = ({ earningsSum }) => {
  const { account } = useWeb3React();

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: "36px" }}>
        Locked
      </Text>
    );
  }

  return (
    <Text color="text" fontSize="24px" bold>
      {earningsSum}
    </Text>
  );
};

export default SltHarvestBalance;
