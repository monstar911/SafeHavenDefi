import { ChainId } from "@pancakeswap/sdk";
import { BIG_TEN } from "../utils/bigNumber";

export const AddressZero = "0x0000000000000000000000000000000000000000";

export const BASE_URL = "https://localhost:3000";
const BSC_BLOCK_TIME = 3;
export const BLOCKS_PER_YEAR = (60 / BSC_BLOCK_TIME) * 60 * 24 * 365; // 10512000

export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18);

export const BASE_BSC_SCAN_URLS = {
  [ChainId.MAINNET]: "https://bscscan.com",
  [ChainId.TESTNET]: "https://testnet.bscscan.com",
};

export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[ChainId.MAINNET];

export const BLOCKED_ADDRESSES = [
  "0x7F367cC41522cE07553e823bf3be79A889DEbe1B",
  "0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b",
  "0x901bb9583b24D97e995513C6778dc6888AB6870e",
  "0xA7e5d5A720f06526557c513402f2e6B5fA20b008",
  "0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C",
];

export const DEFAULT_CHAINID = 56;
