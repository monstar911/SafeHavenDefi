import { useCallback } from "react";
import { stakeFarm } from "../../../utils/calls";
import { useSafeChef } from "../../../hooks/useContract";

const useStakeFarms = (pid) => {
  const safeChefContract = useSafeChef();

  const handleStake = useCallback(
    async (amount, referrer) => {
      const txHash = await stakeFarm(safeChefContract, pid, amount, referrer);
      console.info(txHash);
    },
    [safeChefContract, pid]
  );

  return { onStake: handleStake };
};

export default useStakeFarms;
