import BigNumber from "bignumber.js";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import {
  Flex,
  Text,
  Button,
  Modal,
  LinkExternal,
  CalculateIcon,
  IconButton,
} from "@pancakeswap/uikit";
import { ModalActions, ModalInput } from "../../../components/Modal";
import RoiCalculatorModal from "../../../components/RoiCalculatorModal";
import {
  getFullDisplayBalance,
  formatNumber,
} from "../../../utils/formatBalance";
import useToast from "../../../hooks/useToast";
import { getInterestBreakdown } from "../../../utils/compoundApyHelpers";

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

const DepositModal = ({
  max,
  stakedBalance,
  onConfirm,
  onDismiss,
  tokenName = "",
  multiplier,
  stakePrice,
  stakeLabel,
  apr,
  getTokenLink,
  sltTokenPrice,
}) => {
  const [val, setVal] = useState(0);
  const { toastSuccess, toastError } = useToast();
  const [pendingTx, setPendingTx] = useState(false);
  const [showRoiCalculator, setShowRoiCalculator] = useState(false);
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max);
  }, [max]);

  const stakeTokensToStake = new BigNumber(val);
  const fullBalanceNumber = new BigNumber(fullBalance);

  const usdToStake = stakeTokensToStake.times(stakePrice);

  const interestBreakdown = getInterestBreakdown({
    principalInUSD: !stakeTokensToStake.isNaN() ? usdToStake.toNumber() : 0,
    apr,
    earningTokenPrice: sltTokenPrice,
  });

  const annualRoi = sltTokenPrice.times(interestBreakdown[3]);
  const formattedAnnualRoi = formatNumber(
    annualRoi.toNumber(),
    annualRoi.gt(10000) ? 0 : 2,
    annualRoi.gt(10000) ? 0 : 2
  );

  const handleChange = useCallback(
    (e) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, "."));
      }
    },
    [setVal]
  );

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);

  if (showRoiCalculator) {
    return (
      <RoiCalculatorModal
        linkLabel={`Get ${stakeLabel}`}
        earningTokenPrice={sltTokenPrice}
        apr={apr}
        linkHref={getTokenLink}
        onBack={() => setShowRoiCalculator(false)}
      />
    );
  }

  return (
    <Modal title={"Stake tokens"} onDismiss={onDismiss}>
      <ModalInput
        value={val}
        usdToStake={usdToStake}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        getTokenLink={getTokenLink}
        inputTitle={"Stake"}
      />
      <Flex mt="24px" alignItems="center" justifyContent="space-between">
        <Text mr="8px" color="text">
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
            <CalculateIcon color="text" width="18px" />
          </IconButton>
        </AnnualRoiContainer>
      </Flex>
      <ModalActions>
        <Button
          variant="primary"
          onClick={onDismiss}
          width="100%"
          disabled={pendingTx}
        >
          Cancel
        </Button>
        <Button
          width="100%"
          disabled={
            pendingTx ||
            !stakeTokensToStake.isFinite() ||
            stakeTokensToStake.eq(0) ||
            stakeTokensToStake.gt(fullBalanceNumber)
          }
          onClick={async () => {
            setPendingTx(true);
            try {
              await onConfirm(val);
              toastSuccess(
                "Staked!",
                "Your funds have been staked in the stake"
              );
              onDismiss();
            } catch (e) {
              toastError(
                "Error",
                "Please try again. Confirm the transaction and make sure you are paying enough gas!"
              );
              console.error(e);
            } finally {
              setPendingTx(false);
            }
          }}
        >
          {pendingTx ? "Confirming" : "Confirm"}
        </Button>
      </ModalActions>
      <LinkExternal href={getTokenLink} style={{ alignSelf: "center" }}>
        {`Get ${tokenName}`}
      </LinkExternal>
    </Modal>
  );
};

export default DepositModal;
