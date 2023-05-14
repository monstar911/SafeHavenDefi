import React from "react";
import styled from "styled-components";
import { Card, CardBody } from "@pancakeswap/uikit";
import { useWeb3React } from "@web3-react/core";
import LaunchpadCardHeading from "./LaunchpadCardHeading";
import LaunchpadCardDetails from "./LaunchpadCardDetails";
import LaunchpadCardContribute from "./LaunchpadCardContribute";
import ConnectWalletButton from "../../../../components/ConnectWalletButton";

const StyledLaunchpadCard = styled(Card)`
  background: ${({ theme }) => theme.card.background};
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: auto;
  margin-right: auto;
  max-width: 350px;
  width: 100%;
  padding: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 437px;
  }
`;

const LaunchpadCard = ({ launchpad, referrer }) => {
  const { account } = useWeb3React();
  return (
    <StyledLaunchpadCard>
      <CardBody>
        <LaunchpadCardHeading
          tokenLabel={launchpad.tokenLabel}
          token={launchpad.token}
        />
        <LaunchpadCardDetails {...launchpad} />
        {account ? (
          <LaunchpadCardContribute
            pid={launchpad.pid}
            token={launchpad.token}
            minHavenToJoin={launchpad.minHavenToJoin}
            tokenLabel={launchpad.tokenLabel}
            raisingAmountPool={launchpad.raisingAmountPool}
            offeringAmountPool={launchpad.offeringAmountPool}
            userData={launchpad.userData}
            referrer={referrer}
          />
        ) : (
          <ConnectWalletButton width="100%" />
        )}
      </CardBody>
    </StyledLaunchpadCard>
  );
};

export default LaunchpadCard;
