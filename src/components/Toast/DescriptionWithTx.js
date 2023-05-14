import React from "react";
import { Link, Text } from "@pancakeswap/uikit";
import { getBscScanLink } from "../../utils";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import truncateHash from "../../utils/truncateHash";

const DescriptionWithTx = ({ txHash, children }) => {
  const { chainId } = useActiveWeb3React();

  return (
    <>
      {typeof children === "string" ? (
        <Text color="text" as="p">
          {children}
        </Text>
      ) : (
        children
      )}
      {txHash && (
        <Link external href={getBscScanLink(txHash, "transaction", chainId)}>
          View on BscScan: {truncateHash(txHash, 8, 0)}
        </Link>
      )}
    </>
  );
};

export default DescriptionWithTx;
