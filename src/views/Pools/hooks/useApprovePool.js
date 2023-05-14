import { useCallback } from "react";
import { ethers } from "ethers";
import { useSafeChef } from "../../../hooks/useContract";
import { useCallWithGasPrice } from "../../../hooks/useCallWithGasPrice";

const useApprovePool = (stakeContract) => {
  const safeChefContract = useSafeChef();
  const { callWithGasPrice } = useCallWithGasPrice();
  const handleApprove = useCallback(async () => {
    try {
      const tx = await callWithGasPrice(stakeContract, "approve", [
        safeChefContract.address,
        ethers.constants.MaxUint256,
      ]);
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      return false;
    }
  }, [stakeContract, safeChefContract, callWithGasPrice]);

  return { onApprove: handleApprove };
};

export default useApprovePool;
