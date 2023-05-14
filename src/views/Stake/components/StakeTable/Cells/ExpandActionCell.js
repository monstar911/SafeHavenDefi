import React from "react";
import styled from "styled-components";
import { Text, ChevronDownIcon } from "@pancakeswap/uikit";
import BaseCell from "./BaseCell";

const StyledCell = styled(BaseCell)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  padding-right: 12px;
  padding-left: 0px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 120px;
    padding-right: 32px;
    padding-left: 8px;
  }
`;

const ArrowIcon = styled(ChevronDownIcon)`
  transform: ${({ toggled }) => (toggled ? "rotate(180deg)" : "rotate(0)")};
  height: 24px;
`;

const TotalStakedCell = ({ expanded, isFullLayout }) => {
  return (
    <StyledCell role="cell">
      {isFullLayout && (
        <Text color="primary" bold>
          {expanded ? "Hide" : "Details"}
        </Text>
      )}
      <ArrowIcon color="primary" toggled={expanded} />
    </StyledCell>
  );
};

export default TotalStakedCell;
