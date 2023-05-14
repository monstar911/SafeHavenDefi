import { serializeTokens } from "./tokens";

const serializedTokens = serializeTokens();

const pools = [
  {
    pid: 2,
    lpSymbol: "WBNB-BUSD LP",
    lpAddresses: {
      97: "",
      56: "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16",
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.busd,
    strat: "0x18Ec8299B60328544c90962c550240708e7a0108",
  },
  {
    pid: 19,
    stakeSymbol: "SLT",
    lpAddresses: {
      97: "",
      56: "0x4fb888204C992F222f8a10fabf6353B5d0DB660E",
    },
    token: serializedTokens.slt,
    quoteToken: serializedTokens.wbnb,
    strat: "0xCCbFd461f7b2a8D70A4FBdD2c8ceD40b5ec35911",
  },
  {
    pid: 20,
    stakeSymbol: "WBNB",
    lpAddresses: {
      97: "",
      56: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.wbnb,
    strat: "0x0C2E12a6686C688BE7F0D03a3AcF6Bc16Cd2685C",
  },
  {
    pid: 21,
    stakeSymbol: "BUSD",
    lpAddresses: {
      97: "",
      56: "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16",
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wbnb,
    strat: "0xE534203137E5891951f6917E4dfce5a6bd449E4e",
  },
  {
    pid: 22,
    stakeSymbol: "ETH",
    lpAddresses: {
      97: "",
      56: "0x74E4716E431f45807DCF19f284c7aA99F18a4fbc",
    },
    token: serializedTokens.eth,
    quoteToken: serializedTokens.wbnb,
    strat: "0xBe800eb20E89543C41846368c2744181b0D813F1",
  },
  {
    pid: 23,
    stakeSymbol: "BTCB",
    lpAddresses: {
      97: "",
      56: "0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082",
    },
    token: serializedTokens.btcb,
    quoteToken: serializedTokens.wbnb,
    strat: "0x5ADE6E179Fa2C338e9eD2394d7Fc85D917F75966",
  },
  {
    pid: 24,
    stakeSymbol: "CAKE",
    lpAddresses: {
      97: "",
      56: "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0",
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
    strat: "0x23d45644B007Aedc92db926B418D6B5A1A56c75c",
  },
];

export default pools;
