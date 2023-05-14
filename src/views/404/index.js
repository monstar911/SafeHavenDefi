import styled from "styled-components";
import { Text } from "@pancakeswap/uikit";

const NotFoundPage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledText = styled(Text)`
  font-family: Montserrat SemiBold;
  font-weight: 600;
  font-size: 30px;
  color: ${({ theme }) => theme.colors.text};
`;

function NotFound() {
  return (
    <NotFoundPage>
      <StyledText>Page not found</StyledText>
    </NotFoundPage>
  );
}

export default NotFound;
