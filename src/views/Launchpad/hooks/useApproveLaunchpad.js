import { useCallback } from "react";
import { ethers } from "ethers";
import { useCallWithGasPrice } from "../../../hooks/useCallWithGasPrice";
import { getLaunchpadAddress } from "../../../utils/addressHelpers";

const useApproveLaunchpad = (tokenContract) => {
  const { callWithGasPrice } = useCallWithGasPrice();
  const launchpadAddress = getLaunchpadAddress();
  const handleApprove = useCallback(async () => {
    try {
      const tx = await callWithGasPrice(tokenContract, "approve", [
        launchpadAddress,
        ethers.constants.MaxUint256,
      ]);
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      return false;
    }
  }, [launchpadAddress, tokenContract, callWithGasPrice]);

  return { onApprove: handleApprove };
};

export default useApproveLaunchpad;
