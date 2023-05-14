import { ChainId } from "@pancakeswap/sdk";
import store from "../store/store";
import { GAS_PRICE_GWEI } from "../store/slices/user-slice/hooks/helpers";
import { DEFAULT_CHAINID } from "../constants";

/**
 * Function to return gasPrice outwith a react component
 */
const getGasPrice = () => {
  const chainId = DEFAULT_CHAINID;
  const state = store.getState();
  const userGas = state.user.gasPrice || GAS_PRICE_GWEI.default;
  return chainId === ChainId.MAINNET.toString()
    ? userGas
    : GAS_PRICE_GWEI.testnet;
};

export default getGasPrice;
