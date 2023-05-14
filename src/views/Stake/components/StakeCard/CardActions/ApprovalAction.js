import React from "react";
import { Button, AutoRenewIcon, Skeleton } from "@pancakeswap/uikit";
import { useERC20 } from "../../../../../hooks/useContract";
import { useApproveStake } from "../../../hooks/useApprove";

const ApprovalAction = ({ stake, isLoading = false }) => {
  const { sousId, stakingToken, earningToken } = stake;
  const stakingTokenContract = useERC20(stakingToken.address || "");
  const { handleApprove, requestedApproval } = useApproveStake(
    stakingTokenContract,
    sousId,
    earningToken.symbol
  );

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <Button
          isLoading={requestedApproval}
          endIcon={
            requestedApproval ? (
              <AutoRenewIcon spin color="currentColor" />
            ) : null
          }
          disabled={requestedApproval}
          onClick={handleApprove}
          width="100%"
        >
          Enable
        </Button>
      )}
    </>
  );
};

export default ApprovalAction;
