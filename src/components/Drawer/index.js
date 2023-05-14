import { Drawer } from "@mui/material";
import styled from "styled-components";
import DrawerContent from "./drawer-content";

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
  }
`;

export default function Sidebar({ mobileOpen }) {
  return (
    <StyledDrawer
      variant="permanent"
      anchor="left"
    >
      <DrawerContent mobileOpen={mobileOpen} />
    </StyledDrawer>
  );
}
