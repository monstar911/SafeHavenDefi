import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Button, Flex, Text } from "@pancakeswap/uikit";
import { useDispatch } from "react-redux";
import { useERC20 } from "../../../../hooks/useContract";
import ConnectWalletButton from "../../../../components/ConnectWalletButton";
import StakeAction from "./PoolAction";
import HarvestAction from "./HarvestAction";
import { fetchPoolUserDataAsync } from "../../../../store/slices/pools-slice";
import useApprovePool from "../../hooks/useApprovePool";

const Action = styled.div`
  padding-top: 16px;
`;

const CardActions = ({
  stake,
  account,
  getTokenLink,
  sltTokenPrice,
  stakeLabel,
  referrer,
}) => {
  const [requestedApproval, setRequestedApproval] = useState(false);
  const { pid, token, tokenPriceBusd, withdrawFee } = stake;
  const { allowance, tokenBalance, stakedBalance, earnings } =
    stake.userData || {};
  const isApproved = account && allowance && allowance.isGreaterThan(0);
  const dispatch = useDispatch();

  const stakeContract = useERC20(token.address);
  const { onApprove } = useApprovePool(stakeContract);

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      await onApprove();
      dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }));
      setRequestedApproval(false);
    } catch (e) {
      console.error(e);
    }
  }, [onApprove, dispatch, account, pid]);

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stake={stake}
        withdrawFee={withdrawFee}
        tokenPriceBusd={tokenPriceBusd}
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={stake.stakeSymbol}
        pid={pid}
        apr={stake.apr}
        stakeLabel={stakeLabel}
        sltTokenPrice={sltTokenPrice}
        getTokenLink={getTokenLink}
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
          {stake.stakeSymbol}
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
