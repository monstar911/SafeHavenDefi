import BigNumber from "bignumber.js";
import React, { useCallback, useMemo, useState } from "react";
import { Button, Modal, Text, Flex } from "@pancakeswap/uikit";
import { ModalActions, ModalInput } from "../../../components/Modal";
import { getFullDisplayBalance } from "../../../utils/formatBalance";
import useToast from "../../../hooks/useToast";

const WithdrawModal = ({
  onConfirm,
  onDismiss,
  max,
  tokenName = "",
  lpPrice,
  isWithdrawFee,
  withdrawFee,
  lastDepositTime,
}) => {
  const [val, setVal] = useState(0);
  const { toastSuccess, toastError } = useToast();
  const [pendingTx, setPendingTx] = useState(false);
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max);
  }, [max]);

  const valNumber = new BigNumber(val);
  const fullBalanceNumber = new BigNumber(fullBalance);

  const usdToStake = valNumber.times(lpPrice);
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

  return (
    <Modal title={"Unstake LP tokens"} onDismiss={onDismiss}>
      <Flex justifyContent="space-between" mb="8px">
        <Text color="text">The last deposit block number:</Text>
        <Text color="text" bold>
          {lastDepositTime.toString()}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" mb="8px">
        <Text color="text">Withdrawal Fee:</Text>
        <Text color="text" bold>{`${withdrawFee.toString()}%`}</Text>
      </Flex>
      <ModalInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        usdToStake={usdToStake}
        max={fullBalance}
        symbol={tokenName}
        inputTitle={"Unstake"}
      />
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
          disabled={
            pendingTx ||
            !valNumber.isFinite() ||
            valNumber.eq(0) ||
            valNumber.gt(fullBalanceNumber)
          }
          onClick={async () => {
            setPendingTx(true);
            try {
              await onConfirm(val);
              toastSuccess(
                "Unstaked!",
                "Your earnings have also been harvested to your wallet"
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
          width="100%"
        >
          {pendingTx ? "Confirming" : "Confirm"}
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default WithdrawModal;
