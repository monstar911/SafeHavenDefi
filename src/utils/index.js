import { Contract } from "@ethersproject/contracts";
import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { ChainId } from "@pancakeswap/sdk";
import { BASE_BSC_SCAN_URLS } from "../constants";

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function getBscScanLink(data, type, chainId = ChainId.MAINNET) {
  switch (type) {
    case "transaction": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/tx/${data}`;
    }
    case "token": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/token/${data}`;
    }
    case "block": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/block/${data}`;
    }
    case "countdown": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/block/countdown/${data}`;
    }
    default: {
      return `${BASE_BSC_SCAN_URLS[chainId]}/address/${data}`;
    }
  }
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}
