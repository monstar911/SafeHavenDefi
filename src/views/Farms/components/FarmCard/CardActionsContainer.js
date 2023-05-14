import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Button, Flex, Text } from "@pancakeswap/uikit";
import { getAddress } from "../../../../utils/addressHelpers";
import { useDispatch } from "react-redux";
import { fetchFarmUserDataAsync } from "../../../../store/slices/farms-slice";
import { useERC20 } from "../../../../hooks/useContract";
import ConnectWalletButton from "../../../../components/ConnectWalletButton";
import StakeAction from "./StakeAction";
import HarvestAction from "./HarvestAction";
import useApproveFarm from "../../hooks/useApproveFarm";

const Action = styled.div`
  padding-top: 16px;
`;

const CardActions = ({
  farm,
  account,
  addLiquidityUrl,
  sltTokenPrice,
  lpLabel,
  referrer,
}) => {
  const [requestedApproval, setRequestedApproval] = useState(false);
  const { pid, lpAddresses } = farm;
  const { allowance, tokenBalance, stakedBalance, earnings } =
    farm.userData || {};
  const lpAddress = getAddress(lpAddresses);
  const isApproved = account && allowance && allowance.isGreaterThan(0);
  const dispatch = useDispatch();

  const lpContract = useERC20(lpAddress);

  const { onApprove } = useApproveFarm(lpContract);

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      await onApprove();
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }));
      setRequestedApproval(false);
    } catch (e) {
      console.error(e);
    }
  }, [onApprove, dispatch, account, pid]);

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        farm={farm}
        withdrawFee={farm.withdrawFee}
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={farm.lpSymbol}
        pid={pid}
        apr={farm.apr}
        lpLabel={lpLabel}
        sltTokenPrice={sltTokenPrice}
        addLiquidityUrl={addLiquidityUrl}
        referrer={referrer}
      />
    ) : (
      <Button
        mt="8px"
        width="100%"
        disabled={requestedApproval}
        onClick={handleApprove}
      >
        Enable Contract
      </Button>
    );
  };

  return (
    <Action>
      <Flex>
        <Text
          bold
          textTransform="uppercase"
          color="text"
          fontSize="12px"
          pr="4px"
        >
          SLT
        </Text>
        <Text bold textTransform="uppercase" color="text" fontSize="12px">
          Earned
        </Text>
      </Flex>
      <HarvestAction earnings={earnings} pid={pid} referrer={referrer} />
      <Flex>
        <Text
          bold
          textTransform="uppercase"
          color="text"
          fontSize="12px"
          pr="4px"
        >
          {farm.lpSymbol}
        </Text>
        <Text bold textTransform="uppercase" color="text" fontSize="12px">
          Staked
        </Text>
      </Flex>
      {!account ? (
        <ConnectWalletButton mt="8px" width="100%" />
      ) : (
        renderApprovalOrStakeButton()
      )}
    </Action>
  );
};

export default CardActions;
