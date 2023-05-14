import { Flex } from "@pancakeswap/uikit";
import styled from "styled-components";

const BaseCell = styled.div`
  color: ${({ theme }) => theme.colors.text};
  padding: 24px 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const CellContent = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  max-height: 40px;
`;

export default BaseCell;
