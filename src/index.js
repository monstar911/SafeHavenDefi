import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import Providers from "./Providers";
import useActiveWeb3React from "./hooks/useActiveWeb3React";
import { BLOCKED_ADDRESSES } from "./constants";

import {
  usePollFarmsWithUserData,
  useFarmsFetchBlockNumber,
} from "./store/slices/farms-slice/hooks";
import { usePollPoolsWithUserData } from "./store/slices/pools-slice/hooks";
import { useFetchPublicStakesData } from "./store/slices/stake-slice/hooks";
import { usePollLaunchpadsWithUserData } from "./store/slices/launchpad-slice/hooks";
import { usePollBlockNumber } from "./store/slices/block-slice/hooks";

function Blocklist({ children }) {
  const { account } = useActiveWeb3React();
  const blocked = useMemo(
    () => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1),
    [account]
  );
  if (blocked) {
    return <div>Blocked address</div>;
  }
  return <>{children}</>;
}

function Updaters() {
  useFarmsFetchBlockNumber();
  usePollFarmsWithUserData();
  usePollPoolsWithUserData();
  useFetchPublicStakesData();
  usePollLaunchpadsWithUserData();
  usePollBlockNumber();
  return null;
}

ReactDOM.render(
  <Blocklist>
    <Providers>
      <Updaters />
      <Root />
    </Providers>
  </Blocklist>,
  document.getElementById("root")
);
