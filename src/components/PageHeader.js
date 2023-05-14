import { Box } from "@pancakeswap/uikit";
import styled from "styled-components";
import Container from "./Layout/Container";

const Outer = styled(Box)`
  background-color: ${({theme}) => theme.colors.pageHeaderBackground};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
`;

const Inner = styled(Container)`
  padding: 16px 32px 32px !important;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 16px 100px 32px 100px !important;
  }
`;

const PageHeader = ({ background, children, ...props }) => (
  <Outer {...props} style={{ backgroundImage: `url(${background})` }}>
    <Inner>{children}</Inner>
  </Outer>
);

export default PageHeader;
