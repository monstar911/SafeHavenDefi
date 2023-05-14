import React, { useState } from "react";
import {
  Modal,
  Button,
  Flex,
  LinkExternal,
  useModal,
  Text,
} from "@pancakeswap/uikit";
import { useSelector } from "react-redux"; 
import BalanceInput from "../../../../components/Input/BalanceInput";
import useTokenBalance from "../../../../hooks/useTokenBalance";
import { getFullDisplayBalance } from "../../../../utils/formatBalance";
import useDepositLaunchpad from "../../hooks/useDepositLaunchpad";

const ContributeModal = ({
  pid,
  tokenLabel,
  minHavenToJoin,
  tokenAddress,
  userhavenAmount,
  tokenDecimals,
  onDismiss,
  referrer,
}) => {
  const [value, setValue] = useState("0");
  const [pendingTx, setPendingTx] = useState(false);
  const userDataLoaded = useSelector(state => state.launchpad.userDataLoaded)
  const balance = getFullDisplayBalance(
    useTokenBalance(tokenAddress).balance,
    tokenDecimals
  );
  const { onDeposit } = useDepositLaunchpad(pid);

  const [onConfirmModal] = useModal(
    <Modal>
      <Text color="text" mb="24px">
        Buy {new Intl.NumberFormat("en-US").format(minHavenToJoin.toNumber())}{" "}
        Haven to participate in this pool
      </Text>
      <LinkExternal
        href="https://pancakeswap.finance/swap?outputCurrency=0x9caE753B661142aE766374CEFA5dC800d80446aC"
        style={{ margin: "auto" }}
      >
        Get Haven
      </LinkExternal>
    </Modal>
  );

  const handleDeposit = async () => {
    try {
      setPendingTx(true);
      if (
        userhavenAmount.toNumber() < minHavenToJoin.toNumber()
      ) {
        onConfirmModal();
        return;
      }
      await onDeposit(value, referrer);
      setPendingTx(false);
      onDismiss();
    } catch (e) {
      setPendingTx(false);
      console.error(e);
      onDismiss();
    }
  };
  const getTokenLink = tokenAddress
    ? `https://pancakeswap.finance/swap?outputCurrency=${tokenAddress}`
    : "https://pancakeswap.finance/swap";
  return (
    <Modal title={`Contribute ${tokenLabel}`} onDismiss={onDismiss}>
      <BalanceInput
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        symbol={tokenLabel}
        max={balance}
        onSelectMax={() => setValue(balance.toString())}
      />
      <Flex justifyContent="space-between" mb="24px">
        <Button width="100%" variant="secondary" onClick={onDismiss} mr="8px">
          Cancel
        </Button>
        <Button width="100%" disabled={pendingTx || !userDataLoaded || !(value > 0)} onClick={handleDeposit}>
          Confirm
        </Button>
      </Flex>
      <LinkExternal href={getTokenLink} style={{ margin: "auto" }}>
        {`Get ${tokenLabel}`}
      </LinkExternal>
    </Modal>
  );
};

export default ContributeModal;
