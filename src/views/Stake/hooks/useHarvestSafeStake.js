import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import {
  updateUserBalance,
  updateUserPendingReward,
} from "../../../store/slices/stake-slice";
import getGasPrice from "../../../utils/getGasPrice";
import { useSafeStake } from "../../../hooks/useContract";

const harvestStake = async (safeStakeContract) => {
  const gasPrice = getGasPrice();
  const tx = await safeStakeContract.deposit("0", { gasPrice });
  const receipt = await tx.wait();
  return receipt.status;
};

const useHarvestStake = (sousId) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const safeStakeContract = useSafeStake(sousId);

  const handleHarvest = useCallback(async () => {
    await harvestStake(safeStakeContract);
    dispatch(updateUserPendingReward(sousId, account));
    dispatch(updateUserBalance(sousId, account));
  }, [account, dispatch, safeStakeContract, sousId]);

  return { onReward: handleHarvest };
};

export default useHarvestStake;
