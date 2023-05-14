import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { simpleRpcProvider } from "../utils/providers";
import { DEFAULT_CHAINID } from "../constants";

const useActiveWeb3React = () => {
  const { library, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setprovider] = useState(library || simpleRpcProvider);

  useEffect(() => {
    if (library !== refEth.current) {
      setprovider(library || simpleRpcProvider);
      refEth.current = library;
    }
  }, [library]);
  return {
    library: provider,
    chainId: chainId || DEFAULT_CHAINID,
    ...web3React,
  };
};

export default useActiveWeb3React;
