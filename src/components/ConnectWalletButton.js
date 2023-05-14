import { Button, useWalletModal } from "@pancakeswap/uikit";
import { useTranslation } from "../contexts/Localization";
import useAuth from "../hooks/useAuth";

const ConnectWalletButton = (props) => {
  const { t } = useTranslation();
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout, t);

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton;
