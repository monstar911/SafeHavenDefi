import React, { useCallback } from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  AddIcon,
  MinusIcon,
  useModal,
} from "@pancakeswap/uikit";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Balance from "../../../../components/Balance";
import { fetchPoolUserDataAsync } from "../../../../store/slices/pools-slice";
import {
  getBalanceAmount,
  getBalanceNumber,
} from "../../../../utils/formatBalance";
import DepositModal from "../DepositModal";
import WithdrawModal from "../WithdrawModal";
import useUnstakeStakes from "../../hooks/useUnstakeStakes";
import useStakePools from "../../hooks/useStakePools";

const IconButtonWrapper = styled(Flex)`
  svg {
    width: 20px;
  }
`;

const StakeAction = ({
  stake,
  tokenPriceBusd,
  stakedBalance,
  tokenBalance,
  tokenName,
  pid,
  multiplier,
  apr,
  getTokenLink,
  sltTokenPrice,
  stakeLabel,
  referrer,
}) => {
  const { onStake } = useStakePools(pid);
  const { onUnstake } = useUnstakeStakes(pid);
  const location = useLocation();
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  const handleStake = async (amount) => {
    await onStake(amount, referrer);
    dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }));
  };

  const handleUnstake = async (amount) => {
    await onUnstake(amount);
    dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }));
  };

  const displayBalance = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance);
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
      return "<0.0000001";
    }
    if (stakedBalanceBigNumber.gt(0)) {
      return stakedBalanceBigNumber.toFixed(8, BigNumber.ROUND_DOWN);
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN);
  }, [stakedBalance]);

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      stakedBalance={stakedBalance}
      onConfirm={handleStake}
      tokenName={tokenName}
      multiplier={multiplier}
      stakePrice={tokenPriceBusd}
      stakeLabel={stakeLabel}
      apr={apr}
      getTokenLink={getTokenLink}
      sltTokenPrice={sltTokenPrice}
    />
  );
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={handleUnstake}
      stakePrice={tokenPriceBusd}
      tokenName={tokenName}
      isWithdrawFee={stake.isWithdrawFee}
      withdrawFee={stake.userData.withdrawFee}
      lastDepositTime={stake.userData.lastDepositTime}
    />
  );

  const renderStakingButtons = () => {
    return stakedBalance.eq(0) ? (
      <Button
        onClick={onPresentDeposit}
        disabled={["history"].some((item) => location.pathname.includes(item))}
      >
        Stake
      </Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="primary" width="14px" />
        </IconButton>
        <IconButton
          variant="tertiary"
          onClick={onPresentDeposit}
          disabled={["history"].some((item) =>
            location.pathname.includes(item)
          )}
        >
          <AddIcon color="primary" width="14px" />
        </IconButton>
      </IconButtonWrapper>
    );
  };

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column" alignItems="flex-start">
        <Heading color={stakedBalance.eq(0) ? "#BDC2C4" : "text"}>
          {displayBalance()}
        </Heading>
        {stakedBalance.gt(0) && new BigNumber(tokenPriceBusd).gt(0) && (
          <Balance
            fontSize="12px"
            color="text"
            decimals={2}
            value={getBalanceNumber(
              new BigNumber(tokenPriceBusd).times(stakedBalance)
            )}
            unit=" USD"
            prefix="~"
          />
        )}
      </Flex>
      {renderStakingButtons()}
    </Flex>
  );
};

export default StakeAction;
