import React, { useState } from "react";
import {
  Modal,
  Text,
  Button,
  Heading,
  Flex,
  AutoRenewIcon,
} from "@pancakeswap/uikit";
import useToast from "../../../../../hooks/useToast";
import { formatNumber } from "../../../../../utils/formatBalance";
import useHarvestSafeStake from "../../../hooks/useHarvestSafeStake";

const CollectModal = ({
  formattedBalance,
  earningsDollarValue,
  earningToken,
  sousId,
  onDismiss,
}) => {
  const { toastSuccess, toastError } = useToast();
  const { onReward } = useHarvestSafeStake(sousId);
  const [pendingTx, setPendingTx] = useState(false);

  const handleHarvestConfirm = async () => {
    setPendingTx(true);
    try {
      await onReward();
      toastSuccess(
        `Harvested!`,
        `Your ${earningToken.symbol} earnings have been sent to your wallet!`
      );
      setPendingTx(false);
      onDismiss();
    } catch (e) {
      toastError(
        "Error",
        "Please try again. Confirm the transaction and make sure you are paying enough gas!"
      );
      console.error(e);
      setPendingTx(false);
    }
  };

  return (
    <Modal
      title={`${earningToken.symbol} 'Harvest'}`}
      onDismiss={onDismiss}
    >
      <Flex justifyContent="space-between" alignItems="center" mb="24px">
        <Text color="text">'Harvesting:</Text>
        <Flex flexDirection="column">
          <Heading color="text">
            {formattedBalance} {earningToken.symbol}
          </Heading>
          {earningsDollarValue > 0 && (
            <Text fontSize="12px" color="lightText">{`~${formatNumber(
              earningsDollarValue
            )} USD`}</Text>
          )}
        </Flex>
      </Flex>

      <Button
        mt="8px"
        onClick={handleHarvestConfirm}
        isLoading={pendingTx}
        endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
      >
        {pendingTx ? "Confirming" : "Confirm"}
      </Button>
      <Button variant="text" onClick={onDismiss} pb="0px">
        Close Window
      </Button>
    </Modal>
  );
};

export default CollectModal;
