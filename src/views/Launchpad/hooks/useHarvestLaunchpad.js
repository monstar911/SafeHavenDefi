import { useCallback } from "react";
import { useLaunchpad } from "../../../hooks/useContract";
import { launchpad } from "../../../utils/calls";

const useHarvestLaunchpad = (pid) => {
  const launchpadContract = useLaunchpad();

  const handleHarvest = useCallback(async () => {
    const txHash = await launchpad(launchpadContract, pid, "0");
    console.info(txHash);
  }, [launchpadContract, pid]);

  return { onHarvest: handleHarvest };
};

export default useHarvestLaunchpad;
