import React from "react";
import styled from "styled-components";
import { ListViewIcon, CardViewIcon, IconButton } from "@pancakeswap/uikit";
import { ViewMode } from "../../../../store/slices/user-slice/actions";

const Container = styled.div`
  margin-right: 0px;
  margin-left: -8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
    margin-right: 16px;
  }
`;

const ToggleView = ({ viewMode, onToggle }) => {
  const handleToggle = (mode) => {
    if (viewMode !== mode) {
      onToggle(mode);
    }
  };

  return (
    <Container>
      <IconButton
        variant="text"
        scale="sm"
        id="clickStakeCardView"
        onClick={() => handleToggle(ViewMode.CARD)}
      >
        <CardViewIcon
          color={viewMode === ViewMode.CARD ? "primary" : "textDisabled"}
        />
      </IconButton>
      <IconButton
        variant="text"
        scale="sm"
        id="clickStakeTableView"
        onClick={() => handleToggle(ViewMode.TABLE)}
      >
        <ListViewIcon
          color={viewMode === ViewMode.TABLE ? "primary" : "textDisabled"}
        />
      </IconButton>
    </Container>
  );
};

export default ToggleView;
