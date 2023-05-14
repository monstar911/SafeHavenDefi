import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMatchBreakpoints } from "@pancakeswap/uikit";
import useDelayedUnmount from "../../../../hooks/useDelayedUnmount";
import { usePoolUser } from "../../../../store/slices/pools-slice/hooks";

import Apr from "./Apr";
import Stake from "./Pool";
import Earned from "./Earned";
import Details from "./Details";
import Multiplier from "./Multiplier";
import Liquidity from "./Liquidity";
import ActionPanel from "./Actions/ActionPanel";
import CellLayout from "./CellLayout";
import { DesktopColumnSchema, MobileColumnSchema } from "../types";

const cells = {
  apr: Apr,
  stake: Stake,
  earned: Earned,
  details: Details,
  multiplier: Multiplier,
  liquidity: Liquidity,
};

const CellInner = styled.div`
  padding: 24px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 32px;
  }
`;

const StyledTr = styled.tr`
  cursor: pointer;
  border-bottom: 2px solid ${({theme}) => theme.colors.borderColor};
`;

const EarnedMobileCell = styled.td`
  padding: 16px 0 24px 16px;
`;

const AprMobileCell = styled.td`
  padding-top: 16px;
  padding-bottom: 24px;
`;

const StakeMobileCell = styled.td`
  padding-top: 24px;
`;

const Row = (props) => {
  const { details, userDataReady, referrer } = props;
  const hasStakedAmount = !!usePoolUser(details.pid).stakedBalance.toNumber();
  const [actionPanelExpanded, setActionPanelExpanded] =
    useState(hasStakedAmount);
  const shouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300);
  const toggleActionPanel = () => {
    setActionPanelExpanded(!actionPanelExpanded);
  };

  useEffect(() => {
    setActionPanelExpanded(hasStakedAmount);
  }, [hasStakedAmount]);

  const { isDesktop, isMobile } = useMatchBreakpoints();

  const isSmallerScreen = !isDesktop;
  const tableSchema = isSmallerScreen
    ? MobileColumnSchema
    : DesktopColumnSchema;
  const columnNames = tableSchema.map((column) => column.name);

  const handleRenderRow = () => {
    if (!isMobile) {
      return (
        <StyledTr onClick={toggleActionPanel}>
          {Object.keys(props).map((key) => {
            const columnIndex = columnNames.indexOf(key);
            if (columnIndex === -1) {
              return null;
            }

            switch (key) {
              case "details":
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout>
                        <Details actionPanelToggled={actionPanelExpanded} />
                      </CellLayout>
                    </CellInner>
                  </td>
                );
              case "apr":
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label={"APR"}>
                        <Apr {...props.apr} hideButton={isSmallerScreen} />
                      </CellLayout>
                    </CellInner>
                  </td>
                );
              default:
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label={tableSchema[columnIndex].label}>
                        {React.createElement(cells[key], {
                          ...props[key],
                          userDataReady,
                        })}
                      </CellLayout>
                    </CellInner>
                  </td>
                );
            }
          })}
        </StyledTr>
      );
    }

    return (
      <StyledTr onClick={toggleActionPanel}>
        <td>
          <tr>
            <StakeMobileCell>
              <CellLayout>
                <Stake {...props.stake} />
              </CellLayout>
            </StakeMobileCell>
          </tr>
          <tr>
            <EarnedMobileCell>
              <CellLayout label={"Earned"}>
                <Earned {...props.earned} userDataReady={userDataReady} />
              </CellLayout>
            </EarnedMobileCell>
            <AprMobileCell>
              <CellLayout label={"APR"}>
                <Apr {...props.apr} hideButton />
              </CellLayout>
            </AprMobileCell>
          </tr>
        </td>
        <td>
          <CellInner>
            <CellLayout>
              <Details actionPanelToggled={actionPanelExpanded} />
            </CellLayout>
          </CellInner>
        </td>
      </StyledTr>
    );
  };

  return (
    <>
      {handleRenderRow()}
      {shouldRenderChild && (
        <tr>
          <td colSpan={6}>
            <ActionPanel
              {...props}
              expanded={actionPanelExpanded}
              referrer={referrer}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default Row;
