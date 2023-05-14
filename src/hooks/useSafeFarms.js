import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useFarms } from "../store/slices/farms-slice/hooks";
import { usePools } from "../store/slices/pools-slice/hooks";
import useRefresh from "./useRefresh";

export const useTVL = () => {
  const [tvldata, setTVLData] = useState([]);
  const { account } = useWeb3React();
  const { fastRefresh } = useRefresh();
  const { data: farmsLP } = useFarms();
  const { data: stakesLP } = usePools();

  useEffect(() => {
    const fetchAllData = async () => {
      const farmTVL = farmsLP.map((farm) => {
        return farm.liquidity ? parseFloat(farm.liquidity) : 0;
      });
      const stakeTVL = stakesLP.map((stake) => {
        return stake.liquidity ? parseFloat(stake.liquidity) : 0;
      });
      const tvl = [...farmTVL, ...stakeTVL];
      setTVLData(tvl);
    };

    fetchAllData();
  }, [account, fastRefresh, farmsLP, stakesLP]);

  return tvldata;
};
