import React, { useMemo } from "react";
import { Flex, Skeleton, Text } from "@pancakeswap/uikit";
import styled from "styled-components";
import Balance from "../../../../../components/Balance";
import { getBalanceNumber } from "../../../../../utils/formatBalance";
import BaseCell, { CellContent } from "./BaseCell";

const StyledCell = styled(BaseCell)`
  flex: 2 0 100px;
`;

const TotalStakedCell = ({ stake }) => {
  const { stakingToken, totalStaked } = stake;

  const totalStakedBalance = useMemo(() => {
    return getBalanceNumber(totalStaked, stakingToken.decimals);
  }, [totalStaked, stakingToken.decimals]);

  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="lightText" textAlign="left">
          Total staked
        </Text>
        {totalStaked && totalStaked.gte(0) ? (
          <Flex height="20px" alignItems="center">
            <Balance
              fontSize="16px"
              value={totalStakedBalance}
              decimals={0}
              unit={` ${stakingToken.symbol}`}
            />
          </Flex>
        ) : (
          <Skeleton width="80px" height="16px" />
        )}
      </CellContent>
    </StyledCell>
  );
};

export default TotalStakedCell;
