import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import multicall from "../utils/multicall";
import { getSafeChefAddress } from "../utils/addressHelpers";
import safeChefABI from "../abi/safeChef.json";
import farmsConfig from "../constants/farms";
import poolsConfig from "../constants/pools";
import useRefresh from "./useRefresh";

const useAllEarnings = () => {
  const [balances, setBalance] = useState([]);
  const { account } = useWeb3React();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchAllBalances = async () => {
      const farmsCalls = farmsConfig.map((farm) => ({
        address: getSafeChefAddress(),
        name: "pendingEarnings",
        params: [farm.pid, account],
      }));
      const stakesCalls = poolsConfig.map((stake) => ({
        address: getSafeChefAddress(),
        name: "pendingEarnings",
        params: [stake.pid, account],
      }));

      const calls = [...farmsCalls, ...stakesCalls];

      const res = await multicall(safeChefABI, calls);

      setBalance(res);
    };

    if (account) {
      fetchAllBalances();
    }
  }, [account, fastRefresh]);

  return balances;
};

export default useAllEarnings;
