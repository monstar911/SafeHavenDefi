import React, { useCallback, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { updateUserAllowance } from "../../../store/slices/stake-slice";
import { useSafeStake } from "../../../hooks/useContract";
import useToast from "../../../hooks/useToast";
import { useCallWithGasPrice } from "../../../hooks/useCallWithGasPrice";
import { ToastDescriptionWithTx } from "../../../components/Toast";

export const useApproveStake = (lpContract, sousId, earningTokenSymbol) => {
  const [requestedApproval, setRequestedApproval] = useState(false);
  const { toastSuccess, toastError } = useToast();
  const { callWithGasPrice } = useCallWithGasPrice();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const safeStakeContract = useSafeStake(sousId);

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      const tx = await callWithGasPrice(lpContract, "approve", [
        safeStakeContract.address,
        ethers.constants.MaxUint256,
      ]);
      const receipt = await tx.wait();

      dispatch(updateUserAllowance(sousId, account));
      if (receipt.status) {
        toastSuccess(
          "Contract Enabled",
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {`You can now stake in the ${earningTokenSymbol} stake!`}
          </ToastDescriptionWithTx>
        );
        setRequestedApproval(false);
      } else {
        toastError(
          "Error",
          "Please try again. Confirm the transaction and make sure you are paying enough gas!"
        );
        setRequestedApproval(false);
      }
    } catch (e) {
      console.error(e);
      toastError(
        "Error",
        "Please try again. Confirm the transaction and make sure you are paying enough gas!"
      );
    }
  }, [
    account,
    dispatch,
    lpContract,
    safeStakeContract,
    sousId,
    earningTokenSymbol,
    toastError,
    toastSuccess,
    callWithGasPrice,
  ]);

  return { handleApprove, requestedApproval };
};
