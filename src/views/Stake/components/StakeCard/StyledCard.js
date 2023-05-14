import styled from "styled-components";
import { Card } from "@pancakeswap/uikit";

export const StyledCard = styled(Card)`
  max-width: 352px;
  margin: 0 8px 24px;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  position: relative;
  color: ${({ theme, isFinished }) => (isFinished ? theme.colors.textDisabled : theme.colors.text)};

  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 12px 46px;
  }
`;

export default StyledCard;
