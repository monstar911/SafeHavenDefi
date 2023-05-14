import React, { useState } from "react";
import { Button, Heading, Skeleton, Text } from "@pancakeswap/uikit";
import BigNumber from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
import Balance from "../../../../../components/Balance";
import { BIG_ZERO } from "../../../../../utils/bigNumber";
import { getBalanceAmount } from "../../../../../utils/formatBalance";
import { useDispatch, useSelector } from "react-redux";
import { fetchFarmUserDataAsync } from "../../../../../store/slices/farms-slice";
import useToast from "../../../../../hooks/useToast";
import useHarvestFarm from "../../../hooks/useHarvestFarm";

import { ActionContainer, ActionTitles, ActionContent } from "./styles";

const HarvestAction = ({ pid, userData, userDataReady, referrer }) => {
  const { toastSuccess, toastError } = useToast();
  const earningsBigNumber = new BigNumber(userData.earnings);
  const { account } = useWeb3React();
  const sltTokenPrice = new BigNumber(
    useSelector((state) => state.app.priceOfOneSLT)
  );
  let earnings = BIG_ZERO;
  let earningsBusd = 0;
  let displayBalance = userDataReady ? (
    earnings.toLocaleString()
  ) : (
    <Skeleton width={60} />
  );

  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber);
    earningsBusd = earnings.multipliedBy(sltTokenPrice).toNumber();
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN);
  }

  const [pendingTx, setPendingTx] = useState(false);
  const { onReward } = useHarvestFarm(pid);
  const dispatch = useDispatch();

  return (
    <ActionContainer>
      <ActionTitles>
        <Text
          bold
          textTransform="uppercase"
          color="text"
          fontSize="12px"
          pr="4px"
        >
          SLT
        </Text>
        <Text bold textTransform="uppercase" color="text" fontSize="12px">
          Earned
        </Text>
      </ActionTitles>
      <ActionContent>
        <div>
          <Heading color="text">{displayBalance}</Heading>
          {earningsBusd > 0 && (
            <Balance
              fontSize="12px"
              color="text"
              decimals={2}
              value={earningsBusd}
              unit=" USD"
              prefix="~"
            />
          )}
        </div>
        <Button
          disabled={earnings.eq(0) || pendingTx || !userDataReady}
          onClick={async () => {
            setPendingTx(true);
            try {
              await onReward(referrer);
              toastSuccess(
                `Harvested!`,
                `Your SLT earnings have been sent to your wallet!`
              );
            } catch (e) {
              toastError(
                "Error",
                "Please try again. Confirm the transaction and make sure you are paying enough gas!"
              );
              console.error(e);
            } finally {
              setPendingTx(false);
            }
            dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }));
          }}
          ml="4px"
        >
          Harvest
        </Button>
      </ActionContent>
    </ActionContainer>
  );
};

export default HarvestAction;
