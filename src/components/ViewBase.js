import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Header from "./Header";
import Drawer from "./Drawer";
import MobileDrawer from "./Drawer/mobile-drawer";
import { useThemeManager } from "../store/slices/user-slice/hooks";

const ViewBaseRoot = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const DrawerContent = styled.div`
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 240;
    flex-shrink: 0;
  }
`;

const ViewContent = styled.div`
  position: relative;
  transition: margin 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms;
  background-color: transparent;
  min-height: 100%;
  flex-grow: 1;
  margin-left: 240px;
  margin-top: 80px;
`;

const useStyles = makeStyles({
  contentShift: {
    marginLeft: 50,
  },
  contentMobile: {
    marginLeft: 0,
  },
});

function ViewBase({ children }) {
  const classes = useStyles();
  const [isDark] = useThemeManager();

  const isSmallerScreen = useMediaQuery("(max-width: 968px)");
  const [mobileOpen, setMobileOpen] = useState(true);

  useEffect(() => {
    if (isSmallerScreen) {
      setMobileOpen(false);
    } else {
      setMobileOpen(true);
    }
  }, [isSmallerScreen]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ViewBaseRoot
      style={{
        backgroundColor: isDark ? "#0b1217" : "#f6f6f7",
      }}
    >
      <Header mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <DrawerContent>
        {isSmallerScreen ? (
          <MobileDrawer
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            isSmallerScreen={isSmallerScreen}
          />
        ) : (
          <Drawer mobileOpen={mobileOpen} />
        )}
      </DrawerContent>
      <ViewContent
        className={`${!mobileOpen && classes.contentShift} ${
          isSmallerScreen && classes.contentMobile
        }`}
      >
        {children}
      </ViewContent>
    </ViewBaseRoot>
  );
}

export default ViewBase;
