import styled from "styled-components";

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 240px;
    max-width: 350px;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
    padding: 0;
    ${({ theme }) => theme.mediaQueries.sm} {
      max-width: 40%;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      max-width: 31.5%;
    }
  }
`;

export default FlexLayout;
