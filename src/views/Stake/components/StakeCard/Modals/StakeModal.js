import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Modal,
  Text,
  Flex,
  Image,
  Button,
  BalanceInput,
  AutoRenewIcon,
  Link,
  CalculateIcon,
  IconButton,
} from "@pancakeswap/uikit";
import useToast from "../../../../../hooks/useToast";
import BigNumber from "bignumber.js";
import RoiCalculatorModal from "../../../../../components/RoiCalculatorModal";
import {
  getFullDisplayBalance,
  formatNumber,
  getDecimalAmount,
} from "../../../../../utils/formatBalance";
import { getInterestBreakdown } from "../../../../../utils/compoundApyHelpers";
import PercentageButton from "./PercentageButton";
import useStakeSafeStake from "../../../hooks/useStakeSafeStake";
import useUnstakeSafeStake from "../../../hooks/useUnstakeSafeStake";

const StyledLink = styled(Link)`
  width: 100%;
`;

const AnnualRoiContainer = styled(Flex)`
  cursor: pointer;
`;

const AnnualRoiDisplay = styled(Text)`
  width: 72px;
  max-width: 72px;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
`;

const StakeModal = ({
  stake,
  stakingTokenBalance,
  stakingTokenPrice,
  isRemovingStake = false,
  onDismiss,
}) => {
  const {
    sousId,
    stakingToken,
    earningTokenPrice,
    apr,
    userData,
    stakingLimit,
    earningToken,
    depositFee,
  } = stake;
  const { onStake } = useStakeSafeStake(sousId);
  const { onUnstake } = useUnstakeSafeStake(
    sousId,
    stake.enableEmergencyWithdraw
  );
  const { toastSuccess, toastError } = useToast();
  const [pendingTx, setPendingTx] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [hasReachedStakeLimit, setHasReachedStakedLimit] = useState(false);
  const [, setPercent] = useState(0);
  const [showRoiCalculator, setShowRoiCalculator] = useState(false);
  const getCalculatedStakingLimit = () => {
    if (isRemovingStake) {
      return userData.stakedBalance;
    }
    return stakingLimit.gt(0) && stakingTokenBalance.gt(stakingLimit)
      ? stakingLimit
      : stakingTokenBalance;
  };
  const fullDecimalStakeAmount = getDecimalAmount(
    new BigNumber(stakeAmount),
    stakingToken.decimals
  );
  const userNotEnoughToken = isRemovingStake
    ? userData.stakedBalance.lt(fullDecimalStakeAmount)
    : userData.stakingTokenBalance.lt(fullDecimalStakeAmount);

  const usdValueStaked = new BigNumber(stakeAmount).times(stakingTokenPrice);
  const formattedUsdValueStaked =
    !usdValueStaked.isNaN() && formatNumber(usdValueStaked.toNumber());

  const interestBreakdown = getInterestBreakdown({
    principalInUSD: !usdValueStaked.isNaN() ? usdValueStaked.toNumber() : 0,
    apr,
    earningTokenPrice,
  });
  const annualRoi = interestBreakdown[3] * stake.earningTokenPrice;
  const formattedAnnualRoi = formatNumber(
    annualRoi,
    annualRoi > 10000 ? 0 : 2,
    annualRoi > 10000 ? 0 : 2
  );

  const getTokenLink = stakingToken.address
    ? `https://pancakeswap.finance/swap?outputCurrency=${stakingToken.address}`
    : "https://pancakeswap.finance/swap";

  useEffect(() => {
    if (stakingLimit.gt(0) && !isRemovingStake) {
      setHasReachedStakedLimit(
        fullDecimalStakeAmount.plus(userData.stakedBalance).gt(stakingLimit)
      );
    }
  }, [
    stakeAmount,
    stakingLimit,
    userData,
    stakingToken,
    isRemovingStake,
    setHasReachedStakedLimit,
    fullDecimalStakeAmount,
  ]);

  const handleStakeInputChange = (input) => {
    if (input) {
      const convertedInput = getDecimalAmount(
        new BigNumber(input),
        stakingToken.decimals
      );
      const percentage = Math.floor(
        convertedInput
          .dividedBy(getCalculatedStakingLimit())
          .multipliedBy(100)
          .toNumber()
      );
      setPercent(Math.min(percentage, 100));
    } else {
      setPercent(0);
    }
    setStakeAmount(input);
  };

  const handleChangePercent = (sliderPercent) => {
    if (sliderPercent > 0) {
      const percentageOfStakingMax = getCalculatedStakingLimit()
        .dividedBy(100)
        .multipliedBy(sliderPercent);
      const amountToStake = getFullDisplayBalance(
        percentageOfStakingMax,
        stakingToken.decimals,
        stakingToken.decimals
      );
      setStakeAmount(amountToStake);
    } else {
      setStakeAmount("");
    }
    setPercent(sliderPercent);
  };

  const handleConfirmClick = async () => {
    setPendingTx(true);
    try {
      if (isRemovingStake) {
        await onUnstake(stakeAmount, stakingToken.decimals);
        toastSuccess(
          "Unstaked",
          `Your ${earningToken.symbol} earnings have also been harvested to your wallet!`
        );
      } else {
        await onStake(stakeAmount, stakingToken.decimals);
        toastSuccess(
          "Staked",
          `Your ${stakingToken.symbol} funds have been staked in the stake!`
        );
      }
      setPendingTx(false);
      onDismiss();
    } catch (e) {
      toastError(
        "Error",
        "Please try again. Confirm the transaction and make sure you are paying enough gas!"
      );
      setPendingTx(false);
    }
  };

  if (showRoiCalculator) {
    return (
      <RoiCalculatorModal
        earningTokenPrice={new BigNumber(earningTokenPrice)}
        apr={apr}
        linkLabel={`Get ${stakingToken.symbol}`}
        linkHref={getTokenLink}
        onBack={() => setShowRoiCalculator(false)}
      />
    );
  }

  return (
    <Modal
      minWidth="346px"
      title={isRemovingStake ? "Unstake" : "Stake in stake"}
      onDismiss={onDismiss}
    >
      {stakingLimit.gt(0) && !isRemovingStake && (
        <Text
          color="text"
          bold
          mb="24px"
          style={{ textAlign: "center" }}
          fontSize="16px"
        >
          {`Max stake for this stake: ${getFullDisplayBalance(
            stakingLimit,
            stakingToken.decimals,
            0
          )} ${stakingToken.symbol}`}
        </Text>
      )}
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text color="text" bold>
          {isRemovingStake ? "Unstake" : "Stake"}:
        </Text>
        <Flex alignItems="center" minWidth="70px">
          <Image
            src={`/images/tokens/${stakingToken.address}.png`}
            width={24}
            height={24}
            alt={stakingToken.symbol}
          />
          <Text color="text" ml="4px" bold>
            {stakingToken.symbol}
          </Text>
        </Flex>
      </Flex>
      {isRemovingStake ? (
        <Flex alignItems="center" justifyContent="space-between" mb="8px">
          <Text color="text">Withdrawal Fee:</Text>
          <Text
            color="text"
            bold
          >{`${userData.withdrawFee.toString()}%`}</Text>
        </Flex>
      ) : (
        <Flex alignItems="center" justifyContent="space-between" mb="8px">
          <Text color="text">Deposit Fee:</Text>
          <Text color="text" bold>{`${depositFee.toString()}%`}</Text>
        </Flex>
      )}
      <BalanceInput
        value={stakeAmount}
        onUserInput={handleStakeInputChange}
        currencyValue={
          stakingTokenPrice !== 0 && `~${formattedUsdValueStaked || 0} USD`
        }
        isWarning={hasReachedStakeLimit || userNotEnoughToken}
        decimals={stakingToken.decimals}
      />
      {hasReachedStakeLimit && (
        <Text
          color="failure"
          fontSize="12px"
          style={{ textAlign: "right" }}
          mt="4px"
        >
          {`Maximum total stake: ${getFullDisplayBalance(
            new BigNumber(stakingLimit),
            stakingToken.decimals,
            0
          )} ${stakingToken.symbol}`}
        </Text>
      )}
      {userNotEnoughToken && (
        <Text
          color="failure"
          fontSize="12px"
          style={{ textAlign: "right" }}
          mt="4px"
        >
          {`Insufficient ${stakingToken.symbol} balance`}
        </Text>
      )}
      <Text ml="auto" color="lightText" fontSize="12px" mb="8px">
        {`Balance: ${getFullDisplayBalance(
          getCalculatedStakingLimit(),
          stakingToken.decimals
        )}`}
      </Text>
      <Flex alignItems="center" justifyContent="space-between" mt="8px">
        <PercentageButton onClick={() => handleChangePercent(25)}>
          25%
        </PercentageButton>
        <PercentageButton onClick={() => handleChangePercent(50)}>
          50%
        </PercentageButton>
        <PercentageButton onClick={() => handleChangePercent(75)}>
          75%
        </PercentageButton>
        <PercentageButton onClick={() => handleChangePercent(100)}>
          Max
        </PercentageButton>
      </Flex>
      {!isRemovingStake && (
        <Flex mt="24px" alignItems="center" justifyContent="space-between">
          <Text mr="8px" color="lightText">
            Annual ROI at current rates:
          </Text>
          <AnnualRoiContainer
            alignItems="center"
            onClick={() => setShowRoiCalculator(true)}
          >
            <AnnualRoiDisplay color="text">
              ${formattedAnnualRoi}
            </AnnualRoiDisplay>
            <IconButton variant="text" scale="sm">
              <CalculateIcon color="lightText" width="18px" />
            </IconButton>
          </AnnualRoiContainer>
        </Flex>
      )}
      <Button
        isLoading={pendingTx}
        endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
        onClick={handleConfirmClick}
        disabled={
          !stakeAmount ||
          parseFloat(stakeAmount) === 0 ||
          hasReachedStakeLimit ||
          userNotEnoughToken
        }
        mt="24px"
      >
        {pendingTx ? "Confirming" : "Confirm"}
      </Button>
      {!isRemovingStake && (
        <StyledLink external href={getTokenLink}>
          <Button width="100%" mt="8px" variant="primary">
            {`Get ${stakingToken.symbol}`}
          </Button>
        </StyledLink>
      )}
    </Modal>
  );
};

export default StakeModal;
