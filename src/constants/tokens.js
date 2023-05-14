import { ChainId, Token } from "@pancakeswap/sdk";
import { serializeToken } from "../store/slices/user-slice/hooks/helpers";

const { MAINNET } = ChainId;

export const mainnetTokens = {
  wbnb: new Token(
    MAINNET,
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    18,
    "WBNB",
    "Wrapped BNB",
    "https://www.binance.com/"
  ),
  // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  bnb: new Token(
    MAINNET,
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    18,
    "BNB",
    "BNB",
    "https://www.binance.com/"
  ),
  slt: new Token(
    MAINNET, 
    '0xAaE8bc1BC5527217393228af82b2AD4fAecED99F', 
    18, 
    'SLT',
    'SLT', 
    ''
  ),
  haven: new Token(
    MAINNET, '0x9caE753B661142aE766374CEFA5dC800d80446aC', 
    9, 
    'HAVEN', 
    'HAVEN', 
    ''
  ),
  busd: new Token(
    MAINNET,
    '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    18,
    'BUSD',
    'Binance USD',
    'https://www.paxos.com/busd/',
  ),
  usdt: new Token(
    MAINNET,
    '0x55d398326f99059fF775485246999027B3197955',
    18,
    'USDT',
    'Tether USD',
    'https://tether.to/',
  ),
  usdc: new Token(
    MAINNET,
    '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    18,
    'USDC',
    'Binance-Peg USD Coin',
    'https://www.centre.io/usdc',
  ),
  tusd: new Token(
    MAINNET,
    '0x14016E85a25aeb13065688cAFB43044C2ef86784',
    18,
    'TUSD',
    'Binance-Peg TrueUSD Token',
    'https://www.trueusd.com/',
  ),
  dai: new Token(
    MAINNET,
    '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
    18,
    'DAI',
    'Dai Stablecoin',
    'https://www.makerdao.com/',
  ),
  btcb: new Token(
    MAINNET,
    '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    18,
    'BTCB',
    'Binance BTC',
    'https://bitcoin.org/',
  ),
  eth: new Token(
    MAINNET,
    '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    18,
    'ETH',
    'Binance-Peg Ethereum Token',
    'https://ethereum.org/en/',
  ),
  cake: new Token(
    MAINNET,
    '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://pancakeswap.finance/',
  ),
  belt: new Token(
    MAINNET,
    '0xE0e514c71282b6f4e823703a39374Cf58dc3eA4f',
    18,
    'BELT',
    'Belt Token',
    'https://beta.belt.fi/',
  ),
  dot: new Token(
    MAINNET,
    '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
    18,
    'DOT',
    'Binance-Peg Polkadot Token',
    'https://polkadot.network/',
  ),
  link: new Token(
    MAINNET,
    '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
    18,
    'LINK',
    'Binance-Peg Chainlink Token',
    'https://chain.link/',
  ),
};

export const serializeTokens = () => {
  const serializedTokens = Object.keys(mainnetTokens).reduce((accum, key) => {
    return { ...accum, [key]: serializeToken(mainnetTokens[key]) };
  }, {});

  return serializedTokens;
};

export default mainnetTokens;
