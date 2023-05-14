import React, { useState, useCallback } from "react";
import styled from "styled-components";
import {
  Button,
  useModal,
  IconButton,
  AddIcon,
  MinusIcon,
  Text,
  Heading,
} from "@pancakeswap/uikit";
import { useLocation } from "react-router-dom";
import { BigNumber } from "bignumber.js";
import ConnectWalletButton from "../../../../../components/ConnectWalletButton";
import Balance from "../../../../../components/Balance";
import { useWeb3React } from "@web3-react/core";
import { useFarmUser } from "../../../../../store/slices/farms-slice/hooks";
import { fetchFarmUserDataAsync } from "../../../../../store/slices/farms-slice";
import { useLpTokenPrice } from "../../../../../store/slices/farms-slice/hooks";
import { useERC20 } from "../../../../../hooks/useContract";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../../../../utils/addressHelpers";
import getLiquidityUrlPathParts from "../../../../../utils/getLiquidityUrlPathParts";
import {
  getBalanceAmount,
  getFullDisplayBalance,
  getBalanceNumber,
} from "../../../../../utils/formatBalance";
import useUnstakeFarms from "../../../hooks/useUnstakeFarms";
import DepositModal from "../../DepositModal";
import WithdrawModal from "../../WithdrawModal";
import useStakeFarms from "../../../hooks/useStakeFarms";
import useApproveFarm from "../../../hooks/useApproveFarm";
import { ActionContainer, ActionTitles, ActionContent } from "./styles";

const IconButtonWrapper = styled.div`
  display: flex;
`;

const Staked = ({
  depositFeeBP,
  isWithdrawFee,
  userData,
  lpTotalSupply,
  quoteTokenPriceBusd,
  pid,
  apr,
  multiplier,
  lpSymbol,
  lpLabel,
  lpAddresses,
  quoteToken,
  token,
  referrer,
}) => {
  const { account } = useWeb3React();
  const [requestedApproval, setRequestedApproval] = useState(false);
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid);

  const { onStake } = useStakeFarms(pid);
  const { onUnstake } = useUnstakeFarms(pid);
  const location = useLocation();
  const lpPrice = useLpTokenPrice(lpSymbol);
  const sltTokenPrice = new BigNumber(
    useSelector((state) => state.app.priceOfOneSLT)
  );
  const isApproved = account && allowance && allowance.isGreaterThan(0);
  const lpAddress = getAddress(lpAddresses);
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  });
  const addLiquidityUrl = `https://pancakeswap.finance/add/${liquidityUrlPathParts}`;

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
      return stakedBalanceBigNumber.toFixed(10, BigNumber.ROUND_DOWN);
    }
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
      return getFullDisplayBalance(stakedBalance).toLocaleString();
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN);
  }, [stakedBalance]);

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      lpPrice={lpPrice}
      lpLabel={lpLabel}
      depositFeeBP={depositFeeBP}
      apr={apr}
      stakedBalance={stakedBalance}
      onConfirm={handleStake}
      tokenName={lpSymbol}
      multiplier={multiplier}
      addLiquidityUrl={addLiquidityUrl}
      sltTokenPrice={sltTokenPrice}
    />
  );
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={handleUnstake}
      lpPrice={lpPrice}
      tokenName={lpSymbol}
      isWithdrawFee={isWithdrawFee}
      withdrawFee={userData.withdrawFee}
      lastDepositTime={userData.lastDepositTime}
    />
  );
  const lpContract = useERC20(lpAddress);
  const dispatch = useDispatch();
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

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text bold textTransform="uppercase" color="text" fontSize="12px">
            Start Farming
          </Text>
        </ActionTitles>
        <ActionContent>
          <ConnectWalletButton width="100%" />
        </ActionContent>
      </ActionContainer>
    );
  }

  if (isApproved) {
    if (stakedBalance.gt(0)) {
      return (
        <ActionContainer>
          <ActionTitles>
            <Text
              bold
              textTransform="uppercase"
              color="text"
              fontSize="12px"
              pr="4px"
            >
              {lpSymbol}
            </Text>
            <Text
              bold
              textTransform="uppercase"
              color="text"
              fontSize="12px"
            >
              Staked
            </Text>
          </ActionTitles>
          <ActionContent>
            <div>
              <Heading color="text">{displayBalance()}</Heading>
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
            </div>
            <IconButtonWrapper>
              <IconButton
                variant="primary"
                onClick={onPresentWithdraw}
                mr="6px"
              >
                <MinusIcon color="textColor" width="20px" />
              </IconButton>
              <IconButton
                variant="primary"
                onClick={onPresentDeposit}
                disabled={["history"].some((item) =>
                  location.pathname.includes(item)
                )}
              >
                <AddIcon color="textColor" width="20px" />
              </IconButton>
            </IconButtonWrapper>
          </ActionContent>
        </ActionContainer>
      );
    }

    return (
      <ActionContainer>
        <ActionTitles>
          <Text
            bold
            textTransform="uppercase"
            color="text"
            fontSize="12px"
            pr="4px"
          >
            STAKE
          </Text>
          <Text bold textTransform="uppercase" color="text" fontSize="12px">
            {lpSymbol}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Button
            width="100%"
            onClick={onPresentDeposit}
            variant="primary"
            disabled={["history"].some((item) =>
              location.pathname.includes(item)
            )}
          >
            Stake LP
          </Button>
        </ActionContent>
      </ActionContainer>
    );
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Text bold textTransform="uppercase" color="text" fontSize="12px">
          Enable Farm
        </Text>
      </ActionTitles>
      <ActionContent>
        <Button
          width="100%"
          disabled={requestedApproval}
          onClick={handleApprove}
          variant="primary"
        >
          Enable
        </Button>
      </ActionContent>
    </ActionContainer>
  );
};

export default Staked;
