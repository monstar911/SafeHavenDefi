import { useCallback } from "react";
import { unstakeFarm } from "../../../utils/calls";
import { useSafeChef } from "../../../hooks/useContract";

const useUnstakeFarms = (pid) => {
  const safeChefContract = useSafeChef();

  const handleUnstake = useCallback(
    async (amount) => {
      await unstakeFarm(safeChefContract, pid, amount);
    },
    [safeChefContract, pid]
  );

  return { onUnstake: handleUnstake };
};

export default useUnstakeFarms;
