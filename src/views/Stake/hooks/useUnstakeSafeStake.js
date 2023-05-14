import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { parseUnits } from "ethers/lib/utils";
import { useDispatch } from "react-redux";
import {
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
} from "../../../store/slices/stake-slice";
import { useSafeStake } from "../../../hooks/useContract";
import getGasPrice from "../../../utils/getGasPrice";

const sousUnstake = async (safeStakeContract, amount, decimals) => {
  const gasPrice = getGasPrice();
  const units = parseUnits(amount, decimals);

  const tx = await safeStakeContract.withdraw(units.toString(), {
    gasPrice,
  });
  const receipt = await tx.wait();
  return receipt.status;
};

const sousEmergencyUnstake = async (safeStakeContract) => {
  const gasPrice = getGasPrice();
  const tx = await safeStakeContract.emergencyWithdraw({ gasPrice });
  const receipt = await tx.wait();
  return receipt.status;
};

const useUnstakeSafeStake = (sousId, enableEmergencyWithdraw = false) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const safeStakeContract = useSafeStake(sousId);

  const handleUnstake = useCallback(
    async (amount, decimals) => {
      if (enableEmergencyWithdraw) {
        await sousEmergencyUnstake(safeStakeContract);
      } else {
        await sousUnstake(safeStakeContract, amount, decimals);
      }
      dispatch(updateUserStakedBalance(sousId, account));
      dispatch(updateUserBalance(sousId, account));
      dispatch(updateUserPendingReward(sousId, account));
    },
    [
      account,
      dispatch,
      enableEmergencyWithdraw,
      safeStakeContract,
      sousId,
    ]
  );

  return { onUnstake: handleUnstake };
};

export default useUnstakeSafeStake;
