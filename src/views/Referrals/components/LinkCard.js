import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Text, Flex } from "@pancakeswap/uikit";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Divider from "./Divider";

const StyledCard = styled.div`
  width: 100%;
  margin-bottom: 24px;
  background-color: ${({theme}) => theme.card.background};
  padding: 40px;
  border-radius: 32px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 48%;
    margin-bottom: 0;
  }
`;

const Title = styled(Text)`
  margin-bottom: 24px;
  font-size: 22px;
  font-weight: 600;
`;

const LinkText = styled(Text)`
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  word-break: break-all;
`;

const CopyButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  outline: none;
  border: none;
  cursor: pointer;
  color: ${({theme}) => theme.colors.lightText};
  background-color: transparent;
`;

const LinkCard = ({ title, link }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const copyTextRef = useRef(null);

  return (
    <StyledCard>
      <Title color="text" textAlign="center">
        {title}
      </Title>
      <Flex justifyContent="center">
        <CopyToClipboard text={link} onCopy={() => setCopySuccess(true)}>
          <CopyButton>
            {copySuccess ? `Copied` : `Copy to clipboard`}
          </CopyButton>
        </CopyToClipboard>
      </Flex>
      <Divider />
      <CopyToClipboard text={link} onCopy={() => setCopySuccess(true)}>
        <LinkText ref={copyTextRef} color="lightText" textAlign="center">
          {link}
        </LinkText>
      </CopyToClipboard>
    </StyledCard>
  );
};

export default LinkCard;
