import { useCallback } from "react";
import { get } from "lodash";
import { useGasPrice } from "../store/slices/user-slice/hooks";

export function useCallWithGasPrice() {
  const gasPrice = useGasPrice();
  const callWithGasPrice = useCallback(
    async (contract, methodName, methodArgs = [], overrides = null) => {
      const contractMethod = get(contract, methodName);
      const hasManualGasPriceOverride = overrides?.gasPrice;
      const tx = await contractMethod(
        ...methodArgs,
        hasManualGasPriceOverride
          ? { ...overrides }
          : { ...overrides, gasPrice }
      );

      return tx;
    },
    [gasPrice]
  );

  return { callWithGasPrice };
}
