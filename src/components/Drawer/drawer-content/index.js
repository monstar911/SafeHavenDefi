import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Social from "./social";
import { Link, Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Text, Flex } from "@pancakeswap/uikit";
import classnames from "classnames";
import { useThemeManager } from "../../../store/slices/user-slice/hooks";
import HomeIcon from "../../../assets/icons/home.svg";
import DashboardIcon from "../../../assets/icons/dashboard.svg";
import FarmIcon from "../../../assets/icons/farm.svg";
import PoolsIcon from "../../../assets/icons/pools.svg";
import ReferralsIcon from "../../../assets/icons/referrals.svg";
import LaunchPadIcon from "../../../assets/icons/launchpad.svg";
import StakeIcon from "../../../assets/icons/stake.svg";
import HomeIcon2 from "../../../assets/icons/home2.svg";
import DashboardIcon2 from "../../../assets/icons/dashboard2.svg";
import FarmIcon2 from "../../../assets/icons/farm2.svg";
import PoolsIcon2 from "../../../assets/icons/pools2.svg";
import ReferralsIcon2 from "../../../assets/icons/referrals2.svg";
import LaunchPadIcon2 from "../../../assets/icons/launchpad2.svg";
import StakeIcon2 from "../../../assets/icons/stake2.svg";
import WhitepaperIcon from "../../../assets/icons/whitepaper.svg";
import WhitepaperIcon2 from "../../../assets/icons/whitepaper2.svg";
import AuditIcon from "../../../assets/icons/audit.png";
import AuditIcon2 from "../../../assets/icons/audit2.png";

const DappSideBar = styled(Flex)`
  height: calc(100vh - 80px);
  padding-top: 100px;
  flex-direction: column;
  transition: 0.3s all;
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 100vh;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 20px 0 20px 20px;
  text-decoration: none !important;

  img {
    width: 20px;
    height: 20px;
    vertical-align: -4px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.sideBarTextHoverBackground};
  }
`;

const StyledMenuButton = styled.div`
  padding: 20px;
  text-decoration: none !important;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    vertical-align: -4px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.sideBarTextHoverBackground};
  }
`;

function NavContent({ mobileOpen, isSmallerScreen, handleDrawerToggle }) {
  const [isActive] = useState();
  const [isDark] = useThemeManager();
  const [auditOpen, setAuditOpen] = useState(false);

  const checkPage = useCallback((location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("home") >= 0 && page === "home") {
      return true;
    }
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("safefarms") >= 0 && page === "safefarms") {
      return true;
    }
    if (currentPath.indexOf("safepools") >= 0 && page === "safepools") {
      return true;
    }
    if (currentPath.indexOf("referral") >= 0 && page === "referral") {
      return true;
    }
    if (currentPath.indexOf("safestake") >= 0 && page === "safestake") {
      return true;
    }
    if (currentPath.indexOf("safepad") >= 0 && page === "safepad") {
      return true;
    }
    return false;
  }, []);

  return (
    <DappSideBar
      style={{
        minWidth: mobileOpen ? 240 : 50,
        paddingTop: isSmallerScreen ? 20 : 100,
      }}
    >
      <div style={{ flexGrow: "1" }}>
        <Flex style={{ flexFlow: "column" }}>
          <StyledLink
            onClick={handleDrawerToggle}
            component={NavLink}
            to="/home"
            isActive={(match, location) => {
              return checkPage(location, "home");
            }}
            className={classnames({ active: isActive })}
          >
            <Flex alignItems="center">
              <img
                alt=""
                src={isDark ? HomeIcon2 : HomeIcon}
                style={{ marginRight: mobileOpen ? 10 : 0 }}
              />
              {mobileOpen && (
                <Text fontSize="16px" fontWeight="600">
                  Home
                </Text>
              )}
            </Flex>
          </StyledLink>

          <StyledLink
            component={NavLink}
            onClick={handleDrawerToggle}
            to="/dashboard"
            isActive={(match, location) => {
              return checkPage(location, "dashboard");
            }}
            className={classnames({ active: isActive })}
          >
            <Flex alignItems="center">
              <img
                alt=""
                src={isDark ? DashboardIcon2 : DashboardIcon}
                style={{ marginRight: mobileOpen ? 10 : 0 }}
              />
              {mobileOpen && (
                <Text fontSize="16px" fontWeight="600">
                  Dashboard
                </Text>
              )}
            </Flex>
          </StyledLink>

          <StyledLink
            component={NavLink}
            onClick={handleDrawerToggle}
            to="/safefarms"
            isActive={(match, location) => {
              return checkPage(location, "safefarms");
            }}
            className={classnames({ active: isActive })}
          >
            <Flex alignItems="center">
              <img
                alt=""
                src={isDark ? FarmIcon2 : FarmIcon}
                style={{ marginRight: mobileOpen ? 10 : 0 }}
              />
              {mobileOpen && (
                <Text fontSize="16px" fontWeight="600">
                  SafeFarms
                </Text>
              )}
            </Flex>
          </StyledLink>

          <StyledLink
            component={NavLink}
            onClick={handleDrawerToggle}
            to="/safepools"
            isActive={(match, location) => {
              return checkPage(location, "safepools");
            }}
            className={classnames({ active: isActive })}
          >
            <Flex alignItems="center">
              <img
                alt=""
                src={isDark ? PoolsIcon2 : PoolsIcon}
                style={{ marginRight: mobileOpen ? 10 : 0 }}
              />
              {mobileOpen && (
                <Text fontSize="16px" fontWeight="600">
                  SafePools
                </Text>
              )}
            </Flex>
          </StyledLink>

          <StyledLink
            component={NavLink}
            onClick={handleDrawerToggle}
            to="/referral"
            isActive={(match, location) => {
              return checkPage(location, "referral");
            }}
            className={classnames({ active: isActive })}
          >
            <Flex alignItems="center">
              <img
                alt=""
                src={isDark ? ReferralsIcon2 : ReferralsIcon}
                style={{ marginRight: mobileOpen ? 10 : 0 }}
              />
              {mobileOpen && (
                <Text fontSize="16px" fontWeight="600">
                  Referral
                </Text>
              )}
            </Flex>
          </StyledLink>

          <StyledLink
            component={NavLink}
            onClick={handleDrawerToggle}
            to="/safestake"
            isActive={(match, location) => {
              return checkPage(location, "safestake");
            }}
            className={classnames({ active: isActive })}
          >
            <Flex alignItems="center">
              <img
                alt=""
                src={isDark ? StakeIcon2 : StakeIcon}
                style={{ marginRight: mobileOpen ? 10 : 0 }}
              />
              {mobileOpen && (
                <Text fontSize="16px" fontWeight="600">
                  SafeStake
                </Text>
              )}
            </Flex>
          </StyledLink>

          <StyledLink
            component={NavLink}
            onClick={handleDrawerToggle}
            to="/safepad"
            isActive={(match, location) => {
              return checkPage(location, "safepad");
            }}
            className={classnames({ active: isActive })}
          >
            <Flex alignItems="center">
              <img
                alt=""
                src={isDark ? LaunchPadIcon2 : LaunchPadIcon}
                style={{ marginRight: mobileOpen ? 10 : 0 }}
              />
              {mobileOpen && (
                <Text fontSize="16px" fontWeight="600">
                  SafePad
                </Text>
              )}
            </Flex>
          </StyledLink>

          <StyledLink
            component={Link}
            onClick={handleDrawerToggle}
            href="https://safehavendefi.gitbook.io/untitled/"
            target="_blank"
            className={classnames({ active: isActive })}
          >
            <Flex alignItems="center">
              <img
                alt=""
                src={isDark ? WhitepaperIcon2 : WhitepaperIcon}
                style={{ marginRight: mobileOpen ? 10 : 0 }}
              />
              {mobileOpen && (
                <Text fontSize="16px" fontWeight="600">
                  Whitepaper
                </Text>
              )}
            </Flex>
          </StyledLink>

          <StyledMenuButton
            onClick={() => setAuditOpen(!auditOpen)}
            className={classnames({ active: isActive })}
          >
            <Flex
              alignItems="center"
              style={{ justifyContent: "space-between" }}
            >
              <img
                alt=""
                src={isDark ? AuditIcon2 : AuditIcon}
                style={{ marginRight: mobileOpen ? 10 : 0 }}
              />
              {mobileOpen && (
                <>
                  <Text
                    fontSize="16px"
                    fontWeight="600"
                    style={{ flexGrow: "1" }}
                  >
                    Audits
                  </Text>
                  {auditOpen ? (
                    <ExpandLess
                      sx={{
                        fill: isDark ? "#fff" : "#253449",
                      }}
                    />
                  ) : (
                    <ExpandMore
                      sx={{
                        fill: isDark ? "#fff" : "#253449",
                      }}
                    />
                  )}
                </>
              )}
            </Flex>
          </StyledMenuButton>

          <Collapse in={auditOpen} timeout="auto" unmountOnExit>
            <StyledLink
              component={Link}
              onClick={handleDrawerToggle}
              href="https://twitter.com/SolidProof_io/status/1455647890483908615"
              target="_blank"
              className={classnames({ active: isActive })}
            >
              <Flex alignItems="center">
                <img
                  alt=""
                  src={isDark ? AuditIcon2 : AuditIcon}
                  style={{ marginRight: mobileOpen ? 10 : 0 }}
                />
                {mobileOpen && (
                  <Text fontSize="16px" fontWeight="600">
                    Haven Audit
                  </Text>
                )}
              </Flex>
            </StyledLink>

            <StyledLink
              component={Link}
              onClick={handleDrawerToggle}
              href="https://twitter.com/SolidProof_io/status/1455647890483908615"
              target="_blank"
              className={classnames({ active: isActive })}
            >
              <Flex alignItems="center">
                <img
                  alt=""
                  src={isDark ? AuditIcon2 : AuditIcon}
                  style={{ marginRight: mobileOpen ? 10 : 0 }}
                />
                {mobileOpen && (
                  <Text fontSize="16px" fontWeight="600">
                    SLT Audit
                  </Text>
                )}
              </Flex>
            </StyledLink>
          </Collapse>
        </Flex>
      </div>
      <Social mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
    </DappSideBar>
  );
}

export default NavContent;
