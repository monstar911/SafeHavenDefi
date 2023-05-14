import React, { useState } from "react";
import styled from "styled-components";
import { useMatchBreakpoints } from "@pancakeswap/uikit";
import useDelayedUnmount from "../../../../hooks/useDelayedUnmount";
import NameCell from "./Cells/NameCell";
import EarningsCell from "./Cells/EarningsCell";
import AprCell from "./Cells/AprCell";
import TotalStakedCell from "./Cells/TotalStakedCell";
import EndsInCell from "./Cells/EndsInCell";
import ExpandActionCell from "./Cells/ExpandActionCell";
import ActionPanel from "./ActionPanel/ActionPanel";

const StyledRow = styled.div`
  background-color: transparent;
  display: flex;
  cursor: pointer;
`;

const StakeRow = ({ stake, account, userDataLoaded }) => {
  const { isXs, isSm, isMd, isLg, isXl, isXxl, isTablet, isDesktop } =
    useMatchBreakpoints();
  const isLargerScreen = isLg || isXl || isXxl;
  const [expanded, setExpanded] = useState(false);
  const shouldRenderActionPanel = useDelayedUnmount(expanded, 300);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <StyledRow role="row" onClick={toggleExpanded}>
        <NameCell stake={stake} />
        <EarningsCell
          stake={stake}
          account={account}
          userDataLoaded={userDataLoaded}
        />
        <AprCell stake={stake} />
        {isLargerScreen && <TotalStakedCell stake={stake} />}
        {isDesktop && <EndsInCell stake={stake} />}
        <ExpandActionCell
          expanded={expanded}
          isFullLayout={isTablet || isDesktop}
        />
      </StyledRow>
      {shouldRenderActionPanel && (
        <ActionPanel
          account={account}
          stake={stake}
          userDataLoaded={userDataLoaded}
          expanded={expanded}
          breakpoints={{ isXs, isSm, isMd, isLg, isXl, isXxl }}
        />
      )}
    </>
  );
};

export default StakeRow;
