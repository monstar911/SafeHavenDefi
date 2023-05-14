import React from "react";
import {
  Flex,
  Text,
  Button,
  Heading,
  useModal,
  Skeleton,
} from "@pancakeswap/uikit";
import {
  getBalanceNumber,
  formatNumber,
} from "../../../../../utils/formatBalance";
import Balance from "../../../../../components/Balance";
import CollectModal from "../Modals/CollectModal";

const HarvestActions = ({
  earnings,
  earningToken,
  sousId,
  earningTokenPrice,
  isLoading = false,
}) => {
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals);
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3);

  const earningTokenDollarBalance = getBalanceNumber(
    earnings.multipliedBy(earningTokenPrice),
    earningToken.decimals
  );

  const hasEarnings = earnings.toNumber() > 0;

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      earningsDollarValue={earningTokenDollarBalance}
      earningToken={earningToken}
      sousId={sousId}
    />
  );

  return (
    <Flex justifyContent="space-between" alignItems="center" mb="16px">
      <Flex flexDirection="column">
        {isLoading ? (
          <Skeleton width="80px" height="48px" />
        ) : (
          <>
            {hasEarnings ? (
              <>
                <Balance
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
        )}
      </Flex>
      <Button disabled={!hasEarnings} onClick={onPresentCollect}>
        Harvest
      </Button>
    </Flex>
  );
};

export default HarvestActions;
