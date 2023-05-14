import { useState, useEffect, useCallback } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { loadAppDetails } from "../store/slices/app-slice";
import Loading from "../components/PageLoader";
import ViewBase from "../components/ViewBase";
import {
  Dashboard,
  NotFound,
  Farms,
  Home,
  Pools,
  Stake,
  Referrals,
  Launchpad,
} from "../views";
import "./style.scss";

function App() {
  const dispatch = useDispatch();
  const { library, account } = useActiveWeb3React();
  const [isAppLoading, setIsAppLoading] = useState(true);

  setTimeout(() => {
    setIsAppLoading(false);
  }, [1000]);

  const loadApp = useCallback(
    (loadProvider) => {
      dispatch(loadAppDetails({ provider: loadProvider, account }));
    },
    [account, dispatch]
  );

  const loadDetails = useCallback(
    async (whichDetails) => {
      if (whichDetails === "app") {
        loadApp(library);
      }
    }, [library, loadApp]
  )

  useEffect(() => {
    loadDetails("app");
  }, [account, loadDetails]);

  if (isAppLoading) return <Loading />;

  return (
    <ViewBase>
      <Switch>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>

        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        <Route exact path="/home">
          <Home />
        </Route>

        <Route path="/safefarms">
          <Farms />
        </Route>

        <Route path="/safepools">
          <Pools />
        </Route>

        <Route path="/safestake">
          <Stake />
        </Route>

        <Route path="/referral">
          <Referrals />
        </Route>

        <Route path="/safepad">
          <Launchpad />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </ViewBase>
  );
}

export default App;
