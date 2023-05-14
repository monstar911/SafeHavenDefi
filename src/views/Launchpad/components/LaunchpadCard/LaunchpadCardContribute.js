import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useModal, Button } from "@pancakeswap/uikit";
import { useERC20 } from "../../../../hooks/useContract";
import useApproveLaunchpad from "../../hooks/useApproveLaunchpad";
import useHarvestLaunchpad from "../../hooks/useHarvestLaunchpad";
import useAllowanceLaunchpad from "../../hooks/useAllowanceLaunchpad";
import ContributeModal from "./ContributeModal";

const LaunchpadCardContribute = ({
  pid,
  token,
  minHavenToJoin,
  tokenLabel,
  raisingAmountPool,
  offeringAmountPool,
  userData,
  referrer,
}) => {
  const [pendingTx, setPendingTx] = useState(false);
  const tokenContract = useERC20(token.address);
  const allowance = useAllowanceLaunchpad(tokenContract, pendingTx);
  const { onApprove } = useApproveLaunchpad(tokenContract);
  const { onHarvest } = useHarvestLaunchpad(pid);

  const isFinished = false;
  const app = useSelector((state) => state.app);
  const [onPresentContributeModal] = useModal(
    <ContributeModal
      tokenLabel={tokenLabel}
      minHavenToJoin={minHavenToJoin}
      tokenAddress={token.address}
      tokenDecimals={token.decimals}
      pid={pid}
      userhavenAmount={userData.userhavenAmount}
      referrer={referrer}
    />
  );

  const claim = async () => {
    try {
      setPendingTx(true);
      await onHarvest();
      setPendingTx(false);
    } catch (e) {
      setPendingTx(false);
      console.error(e);
    }
  };

  if (allowance === null) {
    return null;
  }

  if (parseFloat(allowance) <= 0) {
    return (
      <Button
        width="100%"
        disabled={pendingTx}
        onClick={async () => {
          try {
            setPendingTx(true);
            await onApprove();
            setPendingTx(false);
          } catch (e) {
            setPendingTx(false);
            console.error(e);
          }
        }}
      >
        Approve
      </Button>
    );
  }

  return (
    <>
      <Button
        width="100%"
        disabled={(!app.userBalanceOfHAVEN && !isFinished) || pendingTx || userData.claimed}
        onClick={isFinished ? claim : onPresentContributeModal}
      >
        {isFinished ? "Claim" : "Contribute"}
      </Button>
    </>
  );
};

export default LaunchpadCardContribute;
