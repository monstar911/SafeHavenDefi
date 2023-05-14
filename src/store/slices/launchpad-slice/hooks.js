import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import launchpadsConfig from "../../../constants/launchpad";
import useRefresh from "../../../hooks/useRefresh";
import { fetchLaunchpadsPublicDataAsync, fetchLaunchpadUserDataAsync } from ".";

export const usePollLaunchpadsWithUserData = () => {
  const dispatch = useDispatch();
  const { slowRefresh } = useRefresh();
  const { account } = useWeb3React();

  useEffect(() => {
    const pids = launchpadsConfig.map(
      (launchpadToFetch) => launchpadToFetch.pid
    );

    dispatch(fetchLaunchpadsPublicDataAsync(pids));

    if (account) {
      dispatch(fetchLaunchpadUserDataAsync({ account, pids }));
    }
  }, [dispatch, slowRefresh, account]);
};

export const useLaunchpads = () => {
  const launchpads = useSelector((state) => state.launchpad);
  const { userDataLoaded } = launchpads;
  return {
    userDataLoaded,
    data: launchpads.data,
  };
};

export const useLaunchpadFromPid = (pid) => {
  const launchpad = useSelector((state) =>
    state.launchpad.data.find((f) => f.pid === pid)
  );
  return launchpad;
};

export const useLaunchpadUser = (pid) => {
  const { userData } = useLaunchpadFromPid(pid);
  const { referralsCount } = userData;
  return {
    referralsCount,
  };
};
