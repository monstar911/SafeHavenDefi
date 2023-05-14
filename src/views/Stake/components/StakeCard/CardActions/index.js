import BigNumber from "bignumber.js";
import React from "react";
import styled from "styled-components";
import { BIG_ZERO } from "../../../../../utils/bigNumber";
import { Flex, Text, Box } from "@pancakeswap/uikit";
import ApprovalAction from "./ApprovalAction";
import StakeActions from "./StakeActions";
import HarvestActions from "./HarvestActions";

const InlineText = styled(Text)`
  display: inline;
`;

const CardActions = ({ stake, stakedBalance }) => {
  const {
    sousId,
    stakingToken,
    earningToken,
    harvest,
    userData,
    earningTokenPrice,
  } = stake;
  const allowance = userData?.allowance
    ? new BigNumber(userData.allowance)
    : BIG_ZERO;
  const stakingTokenBalance = userData?.stakingTokenBalance
    ? new BigNumber(userData.stakingTokenBalance)
    : BIG_ZERO;
  const earnings = userData?.pendingReward
    ? new BigNumber(userData.pendingReward)
    : BIG_ZERO;
  const needsApproval = !allowance.gt(0);
  const isStaked = stakedBalance.gt(0);
  const isLoading = !userData;

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        {harvest && (
          <>
            <Box display="inline">
              <InlineText
                color="text"
                textTransform="uppercase"
                bold
                fontSize="12px"
              >
                {`${earningToken.symbol} `}
              </InlineText>
              <InlineText
                color="lightText"
                textTransform="uppercase"
                bold
                fontSize="12px"
              >
                Earned
              </InlineText>
            </Box>
            <HarvestActions
              earnings={earnings}
              earningToken={earningToken}
              sousId={sousId}
              earningTokenPrice={earningTokenPrice}
              isLoading={isLoading}
            />
          </>
        )}
        <Box display="inline">
          <InlineText
            color={isStaked ? "text" : "lightText"}
            textTransform="uppercase"
            bold
            fontSize="12px"
          >
            {isStaked ? stakingToken.symbol : "Stake"}{" "}
          </InlineText>
          <InlineText
            color={isStaked ? "lightText" : "text"}
            textTransform="uppercase"
            bold
            fontSize="12px"
          >
            {isStaked ? "Staked" : `${stakingToken.symbol}`}
          </InlineText>
        </Box>
        {needsApproval ? (
          <ApprovalAction stake={stake} isLoading={isLoading} />
        ) : (
          <StakeActions
            isLoading={isLoading}
            stake={stake}
            stakingTokenBalance={stakingTokenBalance}
            stakedBalance={stakedBalance}
            isStaked={isStaked}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default CardActions;
