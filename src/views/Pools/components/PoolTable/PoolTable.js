import React, { useRef } from "react";
import styled from "styled-components";
import { useTable, Button, ChevronUpIcon } from "@pancakeswap/uikit";

import Row from "./Row";

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({theme}) => theme.card.background};
  border-radius: 16px;
  margin: 16px 0px;
`;

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const TableBody = styled.tbody`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`;

const TableContainer = styled.div`
  position: relative;
`;

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const StakeTable = (props) => {
  const tableWrapperEl = useRef(null);
  const { data, columns, userDataReady, referrer } = props;

  const { rows } = useTable(columns, data, {
    sortable: true,
    sortColumn: "stake",
  });

  const scrollToTop = () => {
    tableWrapperEl.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <Container id="stakes-table">
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            <TableBody>
              {rows.map((row) => {
                return (
                  <Row
                    {...row.original}
                    userDataReady={userDataReady}
                    referrer={referrer}
                    key={`table-row-${row.id}`}
                  />
                );
              })}
            </TableBody>
          </StyledTable>
        </TableWrapper>
        <ScrollButtonContainer>
          <Button variant="text" onClick={scrollToTop}>
            To Top
            <ChevronUpIcon color="primary" />
          </Button>
        </ScrollButtonContainer>
      </TableContainer>
    </Container>
  );
};

export default StakeTable;
