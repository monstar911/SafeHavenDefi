import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import {
  updateUserStakedBalance,
  updateUserBalance,
} from "../../../store/slices/stake-slice";
import BigNumber from "bignumber.js";
import { BIG_TEN } from "../../../utils/bigNumber";
import { useSafeStake } from "../../../hooks/useContract";
import getGasPrice from "../../../utils/getGasPrice";

const sousStake = async (safeStakeContract, amount, decimals = 18) => {
  const gasPrice = getGasPrice();
  const tx = await safeStakeContract.deposit(
    new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString(),
    {
      gasPrice,
    }
  );
  const receipt = await tx.wait();
  return receipt.status;
};

const useStakeSafeStake = (sousId) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const safeStakeContract = useSafeStake(sousId);

  const handleStake = useCallback(
    async (amount, decimals) => {
      await sousStake(safeStakeContract, amount, decimals);
      dispatch(updateUserStakedBalance(sousId, account));
      dispatch(updateUserBalance(sousId, account));
    },
    [account, dispatch, safeStakeContract, sousId]
  );

  return { onStake: handleStake };
};

export default useStakeSafeStake;
