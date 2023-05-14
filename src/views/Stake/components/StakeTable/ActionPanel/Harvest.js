import React from "react";
import {
  Button,
  Text,
  useModal,
  Flex,
  Skeleton,
  Heading,
} from "@pancakeswap/uikit";
import BigNumber from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
import {
  formatNumber,
  getBalanceNumber,
} from "../../../../../utils/formatBalance";
import Balance from "../../../../../components/Balance";
import { BIG_ZERO } from "../../../../../utils/bigNumber";

import { ActionContainer, ActionTitles, ActionContent } from "./styles";
import CollectModal from "../../StakeCard/Modals/CollectModal";

const HarvestAction = ({
  sousId,
  earningToken,
  userData,
  userDataLoaded,
  earningTokenPrice,
}) => {
  const { account } = useWeb3React();

  const earnings = userData?.pendingReward
    ? new BigNumber(userData.pendingReward)
    : BIG_ZERO;
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals);
  const earningTokenDollarBalance = getBalanceNumber(
    earnings.multipliedBy(earningTokenPrice),
    earningToken.decimals
  );
  const hasEarnings = earnings.gt(0);
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3);

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      earningsDollarValue={earningTokenDollarBalance}
      earningToken={earningToken}
      sousId={sousId}
    />
  );

  const actionTitle = (
    <>
      <Text
        fontSize="12px"
        bold
        color="text"
        as="span"
        textTransform="uppercase"
      >
        {earningToken.symbol}{" "}
      </Text>
      <Text
        fontSize="12px"
        bold
        color="lightText"
        as="span"
        textTransform="uppercase"
      >
        Earned
      </Text>
    </>
  );

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Heading>0</Heading>
          <Button disabled>Harvest</Button>
        </ActionContent>
      </ActionContainer>
    );
  }

  if (!userDataLoaded) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Skeleton width={180} height="32px" marginTop={14} />
        </ActionContent>
      </ActionContainer>
    );
  }

  return (
    <ActionContainer>
      <ActionTitles>{actionTitle}</ActionTitles>
      <ActionContent>
        <Flex flex="1" pt="16px" flexDirection="column" alignSelf="flex-start">
          <>
            {hasEarnings ? (
              <>
                <Balance
                  lineHeight="1"
                  bold
                  fontSize="20px"
                  decimals={5}
                  value={earningTokenBalance}
                />
                {earningTokenPrice > 0 && (
                  <Balance
                    display="inline"
                    fontSize="12px"
                    color="lightText"
                    decimals={2}
                    prefix="~"
                    value={earningTokenDollarBalance}
                    unit=" USD"
                  />
                )}
              </>
            ) : (
              <>
                <Heading color="textDisabled">0</Heading>
                <Text fontSize="12px" color="textDisabled">
                  0 USD
                </Text>
              </>
            )}
          </>
        </Flex>
        <Button disabled={!hasEarnings} onClick={onPresentCollect}>
          Harvest
        </Button>
      </ActionContent>
    </ActionContainer>
  );
};

export default HarvestAction;
