import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { BIG_TEN } from "./bigNumber";

export const getBalanceAmount = (amount, decimals = 18) => {
  return new BigNumber(amount).div(BIG_TEN.pow(decimals));
};

export const getDecimalAmount = (amount, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber();
};

export const getFullDisplayBalance = (
  balance,
  decimals = 18,
  displayDecimals
) => {
  return getBalanceAmount(balance, decimals).toFixed(displayDecimals);
};

export const formatNumber = (number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  };
  return number.toLocaleString(undefined, options);
};

/**
 * Method to format the display of wei given an ethers.BigNumber object
 * Note: does NOT round
 */
export const formatBigNumber = (
  number,
  displayDecimals = 18,
  decimals = 18
) => {
  const remainder = number.mod(
    ethers.BigNumber.from(10).pow(decimals - displayDecimals)
  );
  return formatUnits(number.sub(remainder), decimals);
};

export const displayNumber = (number) => {
  if (new BigNumber(number).toNumber() > 100000000) {
    return number.toPrecision(4);
  } else {
    return number.toFixed(2);
  }
};
