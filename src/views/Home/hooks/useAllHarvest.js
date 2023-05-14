import { useCallback } from "react";
import { harvestFarm } from "../../../utils/calls";
import { useSafeChef } from "../../../hooks/useContract";

const useAllHarvest = (farmPids) => {
  const safeChefContract = useSafeChef();
  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return harvestFarm(safeChefContract, pid);
    }, []);
    return Promise.all(harvestPromises);
  }, [farmPids, safeChefContract]);

  return { onReward: handleHarvest };
};

export default useAllHarvest;
