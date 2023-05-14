import { makeStyles } from "@mui/styles";
import { Drawer } from "@mui/material";
import styled from "styled-components";
import DrawerContent from "./drawer-content";

const useStyles = makeStyles({
  drawerPaper: {
    width: 240,
    marginTop: 80,
    borderRight: 0,
  },
});

const StyledDrawer = styled(Drawer)`
  .MuiPaper-root {
    z-index: 7;
    background: ${({theme}) => theme.colors.sideBarBackground};
    &::-webkit-scrollbar {
      height: 0;
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background: #888888;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
  },
`;

export default function NavDrawer({
  mobileOpen,
  handleDrawerToggle,
  isSmallerScreen,
}) {
  const classes = useStyles();

  return (
    <StyledDrawer
      variant="temporary"
      anchor="left"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <DrawerContent
        mobileOpen={mobileOpen}
        isSmallerScreen={isSmallerScreen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </StyledDrawer>
  );
}
