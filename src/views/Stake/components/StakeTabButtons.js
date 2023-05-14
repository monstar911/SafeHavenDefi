import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import styled from "styled-components";
import {
  ButtonMenu,
  ButtonMenuItem,
  Toggle,
  Text,
  NotificationDot,
} from "@pancakeswap/uikit";
import ToggleView from "./ToggleView/ToggleView";

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`;

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding-left: 12px;
    padding-right: 12px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 16px;
  }
`;

const StakeTabButtons = ({
  stakedOnly,
  setStakedOnly,
  hasStakeInFinishedStakes,
  viewMode,
  setViewMode,
}) => {
  const { url, isExact } = useRouteMatch();

  const viewModeToggle = (
    <ToggleView viewMode={viewMode} onToggle={(mode) => setViewMode(mode)} />
  );

  const liveOrFinishedSwitch = (
    <Wrapper>
      <ButtonMenu activeIndex={isExact ? 0 : 1} scale="sm" variant="primary">
        <ButtonMenuItem as={Link} to={`${url}`}>
          Live
        </ButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedStakes}>
          <ButtonMenuItem
            id="finished-stakes-button"
            as={Link}
            to={`${url}/history`}
          >
            Finished
          </ButtonMenuItem>
        </NotificationDot>
      </ButtonMenu>
    </Wrapper>
  );

  const stakedOnlySwitch = (
    <ToggleWrapper>
      <Toggle
        checked={stakedOnly}
        onChange={() => setStakedOnly(!stakedOnly)}
        scale="sm"
      />
      <Text color="#fff">Staked only</Text>
    </ToggleWrapper>
  );

  return (
    <ViewControls>
      {viewModeToggle}
      {stakedOnlySwitch}
      {liveOrFinishedSwitch}
    </ViewControls>
  );
};

export default StakeTabButtons;
