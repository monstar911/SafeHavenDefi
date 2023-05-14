import React from "react";
import { useLocation } from "react-router-dom";
import Page from "../../components/Layout/Page";
import Hero from "./components/Hero";
import CurrentLaunchpad from "./CurrentLaunchpad";
import Description from "./components/Description";
import {
  useLaunchpads,
  usePollLaunchpadsWithUserData,
} from "../../store/slices/launchpad-slice/hooks";
import { isAddress } from "../../utils/addressHelpers";
import { AddressZero } from "../../constants";

const Launchpad = () => {
  const { data: launchpadsData } = useLaunchpads();
  const { search } = useLocation();

  let referrer = AddressZero;
  if (search.slice(5) && isAddress(atob(search.slice(5)))) {
    referrer = atob(search.slice(5));
  }
  usePollLaunchpadsWithUserData();

  return (
    <>
      <Hero />
      <Page>
        <CurrentLaunchpad launchpads={launchpadsData} referrer={referrer} />
        <Description />
      </Page>
    </>
  );
};

export default Launchpad;
