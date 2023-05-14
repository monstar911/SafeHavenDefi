import React from "react";
import styled from "styled-components";
import { Text, Button, Input, Flex, Link } from "@pancakeswap/uikit";
import { parseUnits } from "ethers/lib/utils";
import { formatBigNumber, displayNumber } from "../../utils/formatBalance";

const getBoxShadow = ({ isWarning = false, theme }) => {
  if (isWarning) {
    return theme.shadows.warning;
  }

  return theme.shadows.inset;
};

const StyledTokenInput = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.colors.modalInput};
  border-radius: 16px;
  box-shadow: ${getBoxShadow};
  color: ${({theme}) => theme.colors.text};
  padding: 8px 16px 8px 0;
  width: 100%;
`;

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 60px;
  margin: 0 8px;
  padding: 0 8px;
  border: none;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`;

const StyledErrorMessage = styled(Text)`
  position: absolute;
  bottom: -22px;
  a {
    display: inline;
  }
`;

const ModalInput = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  usdToStake,
  value,
  addLiquidityUrl,
  inputTitle,
  decimals = 18,
}) => {
  const isBalanceZero = max === "0" || !max;
  const displayBalance = (balance) => {
    if (isBalanceZero) {
      return "0";
    }

    const balanceUnits = parseUnits(balance, decimals);
    return formatBigNumber(balanceUnits, decimals, decimals);
  };

  return (
    <div style={{ position: "relative" }}>
      <StyledTokenInput isWarning={isBalanceZero}>
        <Flex justifyContent="space-between" pl="16px">
          <Text color="text" fontSize="14px">
            {inputTitle}
          </Text>
          <Text color="text" fontSize="14px">{`Balance: ${displayBalance(
            max
          )}`}</Text>
        </Flex>
        <Flex alignItems="flex-end" justifyContent="space-around">
          <StyledInput
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            inputMode="decimal"
            step="any"
            min="0"
            onChange={onChange}
            placeholder="0"
            value={value}
          />
          <Button scale="sm" onClick={onSelectMax} mr="8px">
            Max
          </Button>
          <Text color="text" fontSize="16px">
            {symbol}
          </Text>
        </Flex>
        <Flex pl="12px">
          <Text color="text" fontSize="12px">{`~${displayNumber(
            usdToStake
          )} USD`}</Text>
        </Flex>
      </StyledTokenInput>
      {isBalanceZero && (
        <StyledErrorMessage fontSize="14px" color="#ED4B9E">
          {"No tokens to stake"}:{" "}
          <Link
            fontSize="14px"
            bold={false}
            href={addLiquidityUrl}
            external
            color="#ED4B9E"
          >
            {`Get ${symbol}`}
          </Link>
        </StyledErrorMessage>
      )}
    </div>
  );
};

export default ModalInput;
