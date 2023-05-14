import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
import multicall from "../utils/multicall";
import { getSafeChefAddress } from "../utils/addressHelpers";
import { useFarms } from "../store/slices/farms-slice/hooks";
import { usePools } from "../store/slices/pools-slice/hooks";
import useRefresh from "./useRefresh";
import safeChefABI from "../abi/safeChef.json";

const useFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState([]);
  const { account } = useWeb3React();
  const { data: farmsLP } = useFarms();
  const { data: stakesLP } = usePools();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalances = async () => {
      const farmsCalls = farmsLP.map((farm) => ({
        address: getSafeChefAddress(),
        name: "pendingEarnings",
        params: [farm.pid, account],
      }));

      const farmsRawResults = await multicall(safeChefABI, farmsCalls);
      const farmsResults = farmsLP.map((farm, index) => ({
        ...farm,
        balance: new BigNumber(farmsRawResults[index]),
      }));

      const stakesCalls = stakesLP.map((stake) => ({
        address: getSafeChefAddress(),
        name: "pendingEarnings",
        params: [stake.pid, account],
      }));

      const stakesrawResults = await multicall(safeChefABI, stakesCalls);
      const stakesResults = stakesLP.map((stake, index) => ({
        ...stake,
        balance: new BigNumber(stakesrawResults[index]),
      }));

      setFarmsWithBalances([...farmsResults, ...stakesResults]);
    };

    if (account) {
      fetchBalances();
    }
  }, [account, fastRefresh, farmsLP, stakesLP]);

  return farmsWithBalances;
};

export default useFarmsWithBalance;
