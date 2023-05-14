import { useMemo } from "react";
import useActiveWeb3React from "./useActiveWeb3React";
import {
  getBep20Contract,
  getSafeChefContract,
  getLaunchpadContract,
  getSafeReferralContract,
  getSafeStakeContract,
} from "../utils/contractHelpers";
import { getMulticallAddress } from "../utils/addressHelpers";
import { getContract } from "../utils";
import multiCallAbi from "../abi/Multicall.json";

export const useSafeChef = () => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getSafeChefContract(library.getSigner()), [library]);
};

export const useERC20 = (address) => {
  const { library } = useActiveWeb3React();
  return useMemo(
    () => getBep20Contract(address, library.getSigner()),
    [address, library]
  );
};

export const useSafeReferral = () => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getSafeReferralContract(library.getSigner()), [library]);
};

export const useLaunchpad = () => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getLaunchpadContract(library.getSigner()), [library]);
};

function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useMulticallContract() {
  return useContract(getMulticallAddress(), multiCallAbi, false);
}

export const useSafeStake = (id) => {
  const { library } = useActiveWeb3React();
  return useMemo(
    () => getSafeStakeContract(id, library.getSigner()),
    [id, library]
  );
};
