import React from "react";
import styled from "styled-components";

const Label = styled.div`
  font-size: 12px;
  color: ${({theme}) => theme.colors.text};
  text-align: left;
`;

const ContentContainer = styled.div`
  min-height: 24px;
  display: flex;
  align-items: center;
`;

const CellLayout = ({ label = "", children }) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <ContentContainer>{children}</ContentContainer>
    </div>
  );
};

export default CellLayout;
