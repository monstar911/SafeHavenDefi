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
import Balance from "../../../../components/Balance";
import { useDispatch } from "react-redux";
import { fetchFarmUserDataAsync } from "../../../../store/slices/farms-slice";
import { useLpTokenPrice } from "../../../../store/slices/farms-slice/hooks";
import {
  getBalanceAmount,
  getBalanceNumber,
} from "../../../../utils/formatBalance";
import DepositModal from "../DepositModal";
import WithdrawModal from "../WithdrawModal";
import useUnstakeFarms from "../../hooks/useUnstakeFarms";
import useStakeFarms from "../../hooks/useStakeFarms";

const IconButtonWrapper = styled(Flex)`
  svg {
    width: 20px;
  }
`;

const StakeAction = ({
  farm,
  stakedBalance,
  tokenBalance,
  tokenName,
  pid,
  multiplier,
  apr,
  addLiquidityUrl,
  sltTokenPrice,
  lpLabel,
  referrer,
}) => {
  const { onStake } = useStakeFarms(pid);
  const { onUnstake } = useUnstakeFarms(pid);
  const location = useLocation();
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  const lpPrice = useLpTokenPrice(farm.lpSymbol);

  const handleStake = async (amount) => {
    await onStake(amount, referrer);
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }));
  };

  const handleUnstake = async (amount) => {
    await onUnstake(amount);
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }));
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
      depositFeeBP={farm.depositFeeBP}
      stakedBalance={stakedBalance}
      onConfirm={handleStake}
      tokenName={tokenName}
      multiplier={multiplier}
      lpPrice={lpPrice}
      lpLabel={lpLabel}
      apr={apr}
      addLiquidityUrl={addLiquidityUrl}
      sltTokenPrice={sltTokenPrice}
    />
  );
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={handleUnstake}
      lpPrice={lpPrice}
      tokenName={tokenName}
      isWithdrawFee={farm.isWithdrawFee}
      withdrawFee={farm.userData.withdrawFee}
      lastDepositTime={farm.userData.lastDepositTime}
    />
  );

  const renderStakingButtons = () => {
    return stakedBalance.eq(0) ? (
      <Button
        onClick={onPresentDeposit}
        disabled={["history"].some((item) => location.pathname.includes(item))}
      >
        Stake LP
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
        {stakedBalance.gt(0) && lpPrice.gt(0) && (
          <Balance
            fontSize="12px"
            color="text"
            decimals={2}
            value={getBalanceNumber(lpPrice.times(stakedBalance))}
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
