import React from "react";
import styled from "styled-components";
import BigNumber from "bignumber.js";
import {
  Button,
  useModal,
  IconButton,
  AddIcon,
  MinusIcon,
  Skeleton,
  useTooltip,
  Flex,
  Text,
} from "@pancakeswap/uikit";
import ConnectWalletButton from "../../../../../components/ConnectWalletButton";
import { useWeb3React } from "@web3-react/core";
import Balance from "../../../../../components/Balance";
import { getBalanceNumber } from "../../../../../utils/formatBalance";
import { BIG_ZERO } from "../../../../../utils/bigNumber";
import { useERC20 } from "../../../../../hooks/useContract";
import { ActionContainer, ActionTitles, ActionContent } from "./styles";
import NotEnoughTokensModal from "../../StakeCard/Modals/NotEnoughTokensModal";
import StakeModal from "../../StakeCard/Modals/StakeModal";
import { useApproveStake } from "../../../hooks/useApprove";

const IconButtonWrapper = styled.div`
  display: flex;
`;

const Staked = ({ stake, userDataLoaded }) => {
  const {
    sousId,
    stakingToken,
    earningToken,
    stakingLimit,
    isFinished,
    userData,
    stakingTokenPrice,
  } = stake;
  const { account } = useWeb3React();

  const stakingTokenContract = useERC20(stakingToken.address || "");
  const {
    handleApprove: handleStakeApprove,
    requestedApproval: requestedStakeApproval,
  } = useApproveStake(stakingTokenContract, sousId, earningToken.symbol);

  const handleApprove = handleStakeApprove;
  const requestedApproval = requestedStakeApproval;

  const allowance = userData?.allowance
    ? new BigNumber(userData.allowance)
    : BIG_ZERO;
  const stakedBalance = userData?.stakedBalance
    ? new BigNumber(userData.stakedBalance)
    : BIG_ZERO;
  const isNotVaultAndHasStake = stakedBalance.gt(0);

  const stakingTokenBalance = userData?.stakingTokenBalance
    ? new BigNumber(userData.stakingTokenBalance)
    : BIG_ZERO;

  const stakedTokenBalance = getBalanceNumber(
    stakedBalance,
    stakingToken.decimals
  );
  const stakedTokenDollarBalance = getBalanceNumber(
    stakedBalance.multipliedBy(stakingTokenPrice),
    stakingToken.decimals
  );

  const needsApproval = !allowance.gt(0);

  const [onPresentTokenRequired] = useModal(
    <NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />
  );

  const [onPresentStake] = useModal(
    <StakeModal
      stake={stake}
      stakingTokenBalance={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
    />
  );

  const [onPresentUnstake] = useModal(
    <StakeModal
      stakingTokenBalance={stakingTokenBalance}
      stake={stake}
      stakingTokenPrice={stakingTokenPrice}
      isRemovingStake
    />
  );

  const onStake = () => {
    onPresentStake();
  };

  const onUnstake = () => {
    onPresentUnstake();
  };

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    "You've already staked the maximum amount you can stake in this stake!",
    { placement: "bottom" }
  );

  const reachStakingLimit =
    stakingLimit.gt(0) && userData.stakedBalance.gte(stakingLimit);

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text
            fontSize="12px"
            bold
            color="lightText"
            as="span"
            textTransform="uppercase"
          >
            Start staking
          </Text>
        </ActionTitles>
        <ActionContent>
          <ConnectWalletButton width="100%" />
        </ActionContent>
      </ActionContainer>
    );
  }

  if (!userDataLoaded) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text
            fontSize="12px"
            bold
            color="lightText"
            as="span"
            textTransform="uppercase"
          >
            Start staking
          </Text>
        </ActionTitles>
        <ActionContent>
          <Skeleton width={180} height="32px" marginTop={14} />
        </ActionContent>
      </ActionContainer>
    );
  }

  if (needsApproval) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text
            fontSize="12px"
            bold
            color="lightText"
            as="span"
            textTransform="uppercase"
          >
            Enable Stake
          </Text>
        </ActionTitles>
        <ActionContent>
          <Button
            width="100%"
            disabled={requestedApproval}
            onClick={handleApprove}
            variant="primary"
          >
            Enable
          </Button>
        </ActionContent>
      </ActionContainer>
    );
  }

  if (isNotVaultAndHasStake) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text
            fontSize="12px"
            bold
            color="text"
            as="span"
            textTransform="uppercase"
          >
            {stakingToken.symbol}{" "}
          </Text>
          <Text
            fontSize="12px"
            bold
            color="lightText"
            as="span"
            textTransform="uppercase"
          >
            Staked
          </Text>
        </ActionTitles>
        <ActionContent>
          <Flex
            flex="1"
            pt="16px"
            flexDirection="column"
            alignSelf="flex-start"
          >
            <Balance
              lineHeight="1"
              bold
              fontSize="20px"
              decimals={5}
              value={stakedTokenBalance}
            />
            <Balance
              fontSize="12px"
              display="inline"
              color="lightText"
              decimals={2}
              value={stakedTokenDollarBalance}
              unit=" USD"
              prefix="~"
            />
          </Flex>
          <IconButtonWrapper>
            <IconButton variant="primary" onClick={onUnstake} mr="6px">
              <MinusIcon color="textColor" width="16px" />
            </IconButton>
            {reachStakingLimit ? (
              <span ref={targetRef}>
                <IconButton variant="primary" disabled>
                  <AddIcon color="textColor" width="24px" height="24px" />
                </IconButton>
              </span>
            ) : (
              <IconButton
                variant="primary"
                onClick={
                  stakingTokenBalance.gt(0) ? onStake : onPresentTokenRequired
                }
                disabled={isFinished}
              >
                <AddIcon color="textColor" width="16px" />
              </IconButton>
            )}
          </IconButtonWrapper>
          {tooltipVisible && tooltip}
        </ActionContent>
      </ActionContainer>
    );
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Text
          fontSize="12px"
          bold
          color="text"
          as="span"
          textTransform="uppercase"
        >
          {"Stake"}{" "}
        </Text>
        <Text
          fontSize="12px"
          bold
          color="lightText"
          as="span"
          textTransform="uppercase"
        >
          {stakingToken.symbol}
        </Text>
      </ActionTitles>
      <ActionContent>
        <Button
          width="100%"
          onClick={stakingTokenBalance.gt(0) ? onStake : onPresentTokenRequired}
          variant="primary"
          disabled={isFinished}
        >
          Stake
        </Button>
      </ActionContent>
    </ActionContainer>
  );
};

export default Staked;
