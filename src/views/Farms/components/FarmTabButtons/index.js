import React from "react";
import styled from "styled-components";
import { useLocation, Link, useRouteMatch } from "react-router-dom";
import {
  ButtonMenu,
  ButtonMenuItem,
  NotificationDot,
} from "@pancakeswap/uikit";

const FarmTabButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding-left: 12px;
    padding-right: 12px;
    text-decoration: none;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 16px;
  }
`;

const FarmTabButtons = ({ hasStakeInFinishedFarms }) => {
  const { url } = useRouteMatch();
  const location = useLocation();

  let activeIndex;
  switch (location.pathname) {
    case "/safefarms":
      activeIndex = 0;
      break;
    case "/safefarms/history":
      activeIndex = 1;
      break;
    default:
      activeIndex = 0;
      break;
  }

  return (
    <FarmTabButtonsWrapper>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="primary">
        <ButtonMenuItem as={Link} to={`${url}`}>
          Live
        </ButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedFarms}>
          <ButtonMenuItem
            id="finished-farms-button"
            as={Link}
            to={`${url}/history`}
          >
            Finished
          </ButtonMenuItem>
        </NotificationDot>
      </ButtonMenu>
    </FarmTabButtonsWrapper>
  );
};

export default FarmTabButtons;
