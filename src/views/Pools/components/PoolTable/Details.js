import React from "react";
import styled from "styled-components";
import { ChevronDownIcon, useMatchBreakpoints } from "@pancakeswap/uikit";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 8px;
  color: ${({theme}) => theme.colors.primary};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`;

const ArrowIcon = styled(ChevronDownIcon)`
  transform: ${({ toggled }) => (toggled ? "rotate(180deg)" : "rotate(0)")};
  height: 20px;
`;

const Details = ({ actionPanelToggled }) => {
  const { isDesktop } = useMatchBreakpoints();

  return (
    <Container>
      {!isDesktop && "Details"}
      <ArrowIcon color="primary" toggled={actionPanelToggled} />
    </Container>
  );
};

export default Details;
