import { AppBar, Toolbar } from "@mui/material";
import styled from "styled-components";
import {
  useWalletModal,
  IconButton,
  Button,
  useModal,
  Modal,
  ModalBody,
  Text,
  Flex,
  Link,
  Skeleton,
} from "@pancakeswap/uikit";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import { useTranslation } from "../contexts/Localization";
import { useThemeManager } from "../store/slices/user-slice/hooks";
import useAuth from "../hooks/useAuth";
import Logo from "../assets/images/logo.webp";
import Drawer1Icon from "../assets/icons/drawer1.svg";
import Drawer1Icon2 from "../assets/icons/drawer1_1.svg";
import Drawer2Icon from "../assets/icons/drawer2.svg";
import Drawer2Icon2 from "../assets/icons/drawer2_1.svg";
import LightIcon from "../assets/icons/light.svg";
import DarkIcon from "../assets/icons/dark.svg";

const StyledAppBar = styled(AppBar)`
  justify-content: flex-end;
  align-items: flex-end;
  background: ${({ theme }) => theme.colors.headerBackground}!important;
`;

const StyledToolbar = styled(Toolbar)`
  width: 100%;
  height: 80px;
  align-items: center;
  margin: auto;
  padding: 15px 24px;
`;

const BNBPriceText = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  align-self: self-end;
  display: none;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
  }
`;

const SwitchTheme = styled.img`
  cursor: pointer;
  margin-right: 16px;
`;

const ConnectButton = styled(Button)`
  font-size: 14px;
  padding: 0 16px;
  height: 36px;
`;

const DisconnectModal = ({ onDismiss, account, onClick }) => (
  <Modal title="Your Wallet" onDismiss={onDismiss}>
    <ModalBody>
      <Text fontWeight="bold" mb="12px">
        {account}
      </Text>
      <Button
        onClick={() => {
          onClick();
          onDismiss();
        }}
      >
        Log out
      </Button>
    </ModalBody>
  </Modal>
);

function Header({ handleDrawerToggle, mobileOpen }) {
  const [isDark, toggleTheme] = useThemeManager();
  const priceOfBNB = useSelector((state) => state.app.priceOfBNB);
  const isAppLoading = useSelector((state) => state.app.loading);
  const { t } = useTranslation();
  const { login, logout } = useAuth();
  const { account } = useWeb3React();
  const { onPresentConnectModal } = useWalletModal(login, logout, t);
  const [onDisconnect] = useModal(
    <DisconnectModal account={account} onClick={logout} />
  );

  const walletControl = () => {
    if (account) {
      onDisconnect();
      return;
    }
    onPresentConnectModal();
  };

  return (
    <div>
      <StyledAppBar position="fixed" elevation={0}>
        <StyledToolbar disableGutters>
          <IconButton variant="text" onClick={handleDrawerToggle}>
            {mobileOpen ? (
              <img
                src={isDark ? Drawer1Icon : Drawer1Icon2}
                width={30}
                height={30}
                alt=""
              />
            ) : (
              <img
                src={isDark ? Drawer2Icon : Drawer2Icon2}
                width={30}
                height={30}
                alt=""
              />
            )}
          </IconButton>
          <div>
            <Link href="/" mr="8px">
              <Flex as="img" alt="" width="50" src={Logo} />
            </Link>
          </div>
          <BNBPriceText>
            BNB:&nbsp;
            {isAppLoading ? (
              <Skeleton width={60} />
            ) : (
              `$${new Intl.NumberFormat("en-US").format(priceOfBNB.toFixed(2))}`
            )}
          </BNBPriceText>
          <Flex alignItems="center" ml="auto">
            <SwitchTheme
              component="img"
              src={isDark ? LightIcon : DarkIcon}
              onClick={toggleTheme}
              alt=""
            />
            <ConnectButton onClick={walletControl}>
              {account
                ? account.replace(/(.{4}).*(.{4})/, "$1...$2")
                : "Connect"}
            </ConnectButton>
          </Flex>
        </StyledToolbar>
      </StyledAppBar>
    </div>
  );
}

export default Header;
