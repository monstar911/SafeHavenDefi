import BigNumber from "bignumber.js";
import React from "react";
import { CardBody, Flex, Text } from "@pancakeswap/uikit";
import ConnectWalletButton from "../../../../components/ConnectWalletButton";
import { BIG_ZERO } from "../../../../utils/bigNumber";
import AprRow from "./AprRow";
import { StyledCard } from "./StyledCard";
import CardFooter from "./CardFooter";
import StyledCardHeader from "./StyledCardHeader";
import CardActions from "./CardActions";

const StakeCard = ({ stake, account }) => {
  const { stakingToken, earningToken, isFinished, userData } = stake;
  const stakedBalance = userData?.stakedBalance
    ? new BigNumber(userData.stakedBalance)
    : BIG_ZERO;
  const accountHasStakedBalance = stakedBalance.gt(0);

  return (
    <StyledCard isFinished={isFinished}>
      <StyledCardHeader
        isStaking={accountHasStakedBalance}
        earningToken={earningToken}
        stakingToken={stakingToken}
        isFinished={isFinished}
      />
      <CardBody>
        <AprRow stake={stake} stakedBalance={stakedBalance} />
        <Flex mt="24px" flexDirection="column">
          {account ? (
            <CardActions stake={stake} stakedBalance={stakedBalance} />
          ) : (
            <>
              <Text
                mb="10px"
                textTransform="uppercase"
                fontSize="12px"
                color="lightText"
                bold
              >
                Start earning
              </Text>
              <ConnectWalletButton />
            </>
          )}
        </Flex>
      </CardBody>
      <CardFooter stake={stake} account={account} />
    </StyledCard>
  );
};

export default StakeCard;
