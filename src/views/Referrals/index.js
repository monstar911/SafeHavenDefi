import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Flex } from "@pancakeswap/uikit";
import Card from "./components/Card";
import LinkCard from "./components/LinkCard";
import Page from "../../components/Layout/Page";
import Hero from "./components/Hero";
import ConnectWalletButton from "../../components/ConnectWalletButton";
import { getSafeReferralContract } from "../../utils/contractHelpers";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";

const CardBox = styled(Flex)`
  margin-bottom: 24px;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`;

const StyledCard = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.card.background};
  padding: 24px 40px;
  border-radius: 32px;
  width: 100%;
`;

const Referral = () => {
  const { library, account } = useActiveWeb3React();
  const testLayerReferralContract = getSafeReferralContract(library);
  const [referralsCount, setReferralsCount] = useState(null);
  const [totalReferralCommissions, setTotalReferralCommissions] =
    useState(null);
  useEffect(() => {
    const fetchData = async () => {
      if (account) {
        setReferralsCount(
          (await testLayerReferralContract.referralsCount(account))._hex
        );
        setTotalReferralCommissions(
          (await testLayerReferralContract.totalReferralCommissions(account))
            ._hex
        );
      }
    };
    fetchData();
  }, [account, testLayerReferralContract]);
  return (
    <>
      <Hero />
      <Page>
        <CardBox justifyContent="space-between">
          <Card title="Total Referrals" value={parseInt(referralsCount)} />
          <Card
            title="Total Referral Commissions"
            value={parseInt(totalReferralCommissions)}
          />
        </CardBox>
        {account ? (
          <CardBox justifyContent="space-between">
            <LinkCard
              title="Invite your friends to farms"
              link={`${window.location.origin}/#/safefarms?ref=${btoa(account)}`}
            />
            <LinkCard
              title="Invite your friends to pools"
              link={`${window.location.origin}/#/safepools?ref=${btoa(account)}`}
            />
          </CardBox>
        ) : (
          <StyledCard>
            <ConnectWalletButton style={{ width: "100%" }} />
          </StyledCard>
        )}
      </Page>
    </>
  );
};

export default Referral;
