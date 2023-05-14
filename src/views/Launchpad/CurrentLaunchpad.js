import React from "react";
import LaunchpadCard from "./components/LaunchpadCard";
import LaunchpadCards from "./components/LaunchpadCards";

const Launchpad = ({ launchpads, referrer }) => {
  return (
    <>
      <LaunchpadCards>
        {launchpads.map((launchpad, key) => (
          <LaunchpadCard key={key} launchpad={launchpad} referrer={referrer} />
        ))}
      </LaunchpadCards>
    </>
  );
};

export default Launchpad;
