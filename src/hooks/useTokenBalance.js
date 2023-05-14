import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
import { getBep20Contract } from "../utils/contractHelpers";
import { BIG_ZERO } from "../utils/bigNumber";
import useRefresh from "./useRefresh";

export const FetchStatus = {
  NOT_FETCHED: "not-fetched",
  SUCCESS: "success",
  FAILED: "failed",
};

const useTokenBalance = (tokenAddress) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [balanceState, setBalanceState] = useState({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  });
  const { account } = useWeb3React();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress);
      try {
        const res = await contract.balanceOf(account);
        setBalanceState({
          balance: new BigNumber(res.toString()),
          fetchStatus: SUCCESS,
        });
      } catch (e) {
        console.error(e);
        setBalanceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }));
      }
    };

    if (account) {
      fetchBalance();
    }
  }, [account, tokenAddress, fastRefresh, SUCCESS, FAILED]);
  return balanceState;
};

export default useTokenBalance;
