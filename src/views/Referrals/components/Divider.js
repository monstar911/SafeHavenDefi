import React from "react";
import styled from "styled-components";

const StyledDivider = styled.div`
  background-color: ${({theme}) => theme.colors.primary};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`;

const Divider = () => {
  return <StyledDivider />;
};

export default Divider;
