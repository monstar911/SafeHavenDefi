import React, { useRef } from "react";
import styled from "styled-components";
import { Button, ChevronUpIcon } from "@pancakeswap/uikit";
import StakeRow from "./StakeRow";

const StyledTable = styled.div`
  border-radius: ${({ theme }) => theme.radii.card};

  background-color: ${({theme}) => theme.card.background};
  > div:not(:last-child) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
  }
`;

const StyledTableBorder = styled.div`
  border-radius: ${({ theme }) => theme.radii.card};
  background-color: ${({ theme }) => theme.colors.borderColor};
  padding: 1px 1px 3px 1px;
  background-size: 400% 400%;
`;

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const StakeTable = ({ stakes, userDataLoaded, account }) => {
  const tableWrapperEl = useRef(null);
  const scrollToTop = () => {
    tableWrapperEl.current.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <StyledTableBorder>
      <StyledTable id="stakes-table" role="table" ref={tableWrapperEl}>
        {stakes.map((stake) => (
          <StakeRow
            key={stake.sousId}
            stake={stake}
            account={account}
            userDataLoaded={userDataLoaded}
          />
        ))}
        <ScrollButtonContainer>
          <Button variant="text" onClick={scrollToTop}>
            To Top
            <ChevronUpIcon color="primary" />
          </Button>
        </ScrollButtonContainer>
      </StyledTable>
    </StyledTableBorder>
  );
};

export default StakeTable;
