import React from "react";
import { ListViewIcon, CardViewIcon, IconButton } from "@pancakeswap/uikit";
import { ViewMode } from "../../../../store/slices/user-slice/actions";

const ToggleView = ({ viewMode, onToggle }) => {
  const handleToggle = (mode) => {
    if (viewMode !== mode) {
      onToggle(mode);
    }
  };

  return (
    <div>
      <IconButton
        variant="text"
        scale="sm"
        id="clickStakeCardView"
        onClick={() => handleToggle(ViewMode.CARD)}
      >
        <CardViewIcon
          color={viewMode === ViewMode.CARD ? "primary" : "#BDC2C4"}
        />
      </IconButton>
      <IconButton
        variant="text"
        scale="sm"
        id="clickStakeTableView"
        onClick={() => handleToggle(ViewMode.TABLE)}
      >
        <ListViewIcon
          color={viewMode === ViewMode.TABLE ? "primary" : "#BDC2C4"}
        />
      </IconButton>
    </div>
  );
};

export default ToggleView;
