import { useCallback } from "react";
import { ethers } from "ethers";
import { useSafeChef } from "../../../hooks/useContract";
import { useCallWithGasPrice } from "../../../hooks/useCallWithGasPrice";

const useApproveFarm = (lpContract) => {
  const safeChefContract = useSafeChef();
  const { callWithGasPrice } = useCallWithGasPrice();
  const handleApprove = useCallback(async () => {
    try {
      const tx = await callWithGasPrice(lpContract, "approve", [
        safeChefContract.address,
        ethers.constants.MaxUint256,
      ]);
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      return false;
    }
  }, [lpContract, safeChefContract, callWithGasPrice]);

  return { onApprove: handleApprove };
};

export default useApproveFarm;
