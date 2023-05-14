import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { Button, Flex, Heading } from "@pancakeswap/uikit";
import { useDispatch, useSelector } from "react-redux";
import { fetchFarmUserDataAsync } from "../../../../store/slices/farms-slice";
import useToast from "../../../../hooks/useToast";
import { getBalanceAmount } from "../../../../utils/formatBalance";
import { BIG_ZERO } from "../../../../utils/bigNumber";
import Balance from "../../../../components/Balance";
import useHarvestFarm from "../../hooks/useHarvestFarm";
import { useWeb3React } from "@web3-react/core";

const HarvestAction = ({ earnings, pid, referrer }) => {
  const { account } = useWeb3React();
  const { toastSuccess, toastError } = useToast();
  const [pendingTx, setPendingTx] = useState(false);
  const { onReward } = useHarvestFarm(pid);
  const sltTokenPrice = new BigNumber(
    useSelector((state) => state.app.priceOfOneSLT)
  );
  const dispatch = useDispatch();
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO;
  const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN);
  const earningsBusd = rawEarningsBalance
    ? rawEarningsBalance.multipliedBy(sltTokenPrice).toNumber()
    : 0;
  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column" alignItems="flex-start">
        <Heading color={rawEarningsBalance.eq(0) ? "#BDC2C4" : "text"}>
          {displayBalance}
        </Heading>
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
      </Flex>
      <Button
        disabled={rawEarningsBalance.eq(0) || pendingTx}
        onClick={async () => {
          setPendingTx(true);
          try {
            await onReward(referrer);
            toastSuccess(
              `Harvested!`,
              "Your SLT earnings have been sent to your wallet!"
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
      >
        Harvest
      </Button>
    </Flex>
  );
};

export default HarvestAction;
