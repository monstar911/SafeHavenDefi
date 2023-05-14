import React from "react";
import styled from "styled-components";
import { Modal, Text, Button, OpenNewIcon, Link } from "@pancakeswap/uikit";

const StyledLink = styled(Link)`
  width: 100%;
`;

const NotEnoughTokensModal = ({ tokenSymbol, onDismiss }) => {
  return (
    <Modal
      title={`${tokenSymbol} required`}
      onDismiss={onDismiss}
    >
      <Text color="failure" bold>
        {`Insufficient ${tokenSymbol} balance`}
      </Text>
      <Text
        color="text"
        mt="24px"
      >{`You’ll need ${tokenSymbol} to stake in this stake!`}</Text>
      <Text>
        {`Buy some ${tokenSymbol}, or make sure your ${tokenSymbol} isn’t in another stake or LP.`}
      </Text>
      <Button
        variant="primary"
        mt="24px"
        as="a"
        external
        href="https://pancakeswap.finance/swap"
      >
        Buy {tokenSymbol}
      </Button>
      <StyledLink href="https://yieldwatch.net" external>
        <Button variant="primary" mt="8px" width="100%">
          Locate Assets
          <OpenNewIcon color="primary" ml="4px" />
        </Button>
      </StyledLink>
      <Button variant="text" onClick={onDismiss}>
        Close Window
      </Button>
    </Modal>
  );
};

export default NotEnoughTokensModal;
