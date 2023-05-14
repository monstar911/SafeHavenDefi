import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { simpleRpcProvider } from "../../../utils/providers";
import useRefresh from "../../../hooks/useRefresh";
import { fetchStakesPublicDataAsync, fetchStakesUserDataAsync } from ".";
import { transformStake } from "./helpers";

export const useFetchPublicStakesData = () => {
  const dispatch = useDispatch();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    const fetchStakesPublicData = async () => {
      const blockNumber = await simpleRpcProvider.getBlockNumber();
      dispatch(fetchStakesPublicDataAsync(blockNumber));
    };

    fetchStakesPublicData();
  }, [dispatch, slowRefresh]);
};

export const useFetchUserStakes = (account) => {
  const { fastRefresh } = useRefresh();
  const dispatch = useDispatch();
  useEffect(() => {
    if (account) {
      dispatch(fetchStakesUserDataAsync(account));
    }
  }, [account, dispatch, fastRefresh]);
};

export const useStakes = () => {
  const { stakes, userDataLoaded } = useSelector((state) => ({
    stakes: state.stake.data,
    userDataLoaded: state.stake.userDataLoaded,
  }));
  return { stakes: stakes.map(transformStake), userDataLoaded };
};
