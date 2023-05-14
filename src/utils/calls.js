import BigNumber from "bignumber.js";
import { DEFAULT_TOKEN_DECIMAL } from "../constants";
import getGasPrice from "./getGasPrice";

export const stakeFarm = async (safeChefContract, pid, amount, referrer) => {
  try {
    const gasPrice = getGasPrice();
    const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString();
    const tx = await safeChefContract.deposit(pid, value, referrer, {
      gasPrice,
    });
    const receipt = await tx.wait();
    return receipt.status;
  } catch (e) {
    console.log(e);
  }
};

export const unstakeFarm = async (safeChefContract, pid, amount) => {
  try {
    const gasPrice = getGasPrice();
    const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString();

    const tx = await safeChefContract.withdraw(pid, value, { gasPrice });
    const receipt = await tx.wait();
    return receipt.status;
  } catch (e) {
    console.log(e);
  }
};

export const harvestFarm = async (safeChefContract, pid, referrer) => {
  try {
    const gasPrice = getGasPrice();
    const tx = await safeChefContract.deposit(
      pid,
      "0",
      referrer,
      { gasPrice }
    );
    const receipt = await tx.wait();
    return receipt.status;
  } catch (e) {
    console.log(e);
  }
};

export const launchpad = async (launchpadContract, pid, amount, referrer) => {
  try {
    const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString();
    const tx = await launchpadContract.depositPool(value, pid, referrer, {
      gasPrice: 6000000000,
    });
    const receipt = await tx.wait();
    return receipt.status;
  } catch (e) {
    alert(e?.data?.message);
  }
};
