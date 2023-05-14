import { useCallback } from "react";
import { useLaunchpad } from "../../../hooks/useContract";
import { launchpad } from "../../../utils/calls";

const useDepositLaunchpad = (pid) => {
  const launchpadContract = useLaunchpad();
  const handleDeposit = useCallback(
    async (amount, referrer) => {
      const txHash = await launchpad(launchpadContract, pid, amount, referrer);
      console.info(txHash);
    },
    [launchpadContract, pid]
  );

  return { onDeposit: handleDeposit };
};

export default useDepositLaunchpad;
