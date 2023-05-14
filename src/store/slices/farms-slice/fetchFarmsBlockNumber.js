import BigNumber from "bignumber.js";
import { getSafeChefAddress } from "../../../utils/addressHelpers";
import multicall from "../../../utils/multicall";
import safechefABI from "../../../abi/safeChef.json";

const fetchFarmsBlockNumber = async () => {
  const masterChefABI = safechefABI;
  const [startBlock, endBlock] = await multicall(masterChefABI, [
    {
      address: getSafeChefAddress(),
      name: "startBlock",
    },
    {
      address: getSafeChefAddress(),
      name: "endBlock",
    },
  ]);

  return {
    startBlockNumber: (new BigNumber(startBlock)).toNumber(),
    endBlockNumber: (new BigNumber(endBlock)).toNumber(),
  };
};

export default fetchFarmsBlockNumber;
