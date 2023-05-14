import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
import { getLaunchpadAddress } from "../../../utils/addressHelpers";

const useAllowanceLaunchpad = (tokenContract, dependency) => {
  const { account } = useWeb3React();
  const [allowance, setAllowance] = useState(null);
  const launchpadAddress = getLaunchpadAddress();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tokenContract.allowance(account, launchpadAddress);
        setAllowance(new BigNumber(res._hex));
      } catch (e) {
        setAllowance(null);
      }
    };
    fetch();
  }, [account, launchpadAddress, tokenContract, dependency]);

  return allowance;
};

export default useAllowanceLaunchpad;
