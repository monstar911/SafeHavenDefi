import { serializeTokens } from "./tokens";

const serializedTokens = serializeTokens();

const farms = [
  {
    pid: 0,
    lpSymbol: "SLT-WBNB LP",
    lpAddresses: {
      97: "",
      56: "0xaE89A6334AAa16AEDEaD0629D0F8148A3F06e005",
    },
    token: serializedTokens.slt,
    quoteToken: serializedTokens.wbnb,
    strat: "0x1Fd6fD5A042352fACBDab5c2FA65b07eFBBE0ff3",
  },
  {
    pid: 1,
    lpSymbol: "SLT-BUSD LP",
    lpAddresses: {
      97: "",
      56: "0x7dd290b909203BBC458f2563cC70459fCaBf765B",
    },
    token: serializedTokens.slt,
    quoteToken: serializedTokens.busd,
    strat: "0xC9cAeC36BD861CEA6771dbeD18a668F6D99cBd31",
  },
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
    pid: 3,
    lpSymbol: "USDT-BUSD LP",
    lpAddresses: {
      97: "",
      56: "0x7EFaEf62fDdCCa950418312c6C91Aef321375A00",
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.busd,
    strat: "0x19B26a220C2fC32d9010CE2CA1F90eB3acD3D6Da",
  },
  {
    pid: 4,
    lpSymbol: "USDC-BUSD LP",
    lpAddresses: {
      97: "",
      56: "0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1",
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.busd,
    strat: "0xCa4eea890374cD7E809CB869b78784D18Ff5234e",
  },
  {
    pid: 5,
    lpSymbol: "TUSD-BUSD LP",
    lpAddresses: {
      97: "",
      56: "0x2E28b9B74D6d99D4697e913b82B41ef1CAC51c6C",
    },
    token: serializedTokens.tusd,
    quoteToken: serializedTokens.busd,
    strat: "0x01DCd9612ADF2fbEC43993935962c55B389eeB9e",
  },
  {
    pid: 6,
    lpSymbol: "DAI-BUSD LP",
    lpAddresses: {
      97: "",
      56: "0x66FDB2eCCfB58cF098eaa419e5EfDe841368e489",
    },
    token: serializedTokens.dai,
    quoteToken: serializedTokens.busd,
    strat: "0x714Eb1138a0211C0d61ff204D223CB4A12c162E6",
  },
  {
    pid: 7,
    lpSymbol: "ETH-BTCB LP",
    lpAddresses: {
      97: "",
      56: "0xD171B26E4484402de70e3Ea256bE5A2630d7e88D",
    },
    token: serializedTokens.eth,
    quoteToken: serializedTokens.btcb,
    strat: "0x7A3E2F6afCA18BceB0e0e0F575894bed404F5baA",
  },
  {
    pid: 8,
    lpSymbol: "ETH-WBNB LP",
    lpAddresses: {
      97: "",
      56: "0x74E4716E431f45807DCF19f284c7aA99F18a4fbc",
    },
    token: serializedTokens.eth,
    quoteToken: serializedTokens.wbnb,
    strat: "0x4F14e70d0C2E6EC18d578b090EFEF49af8a9306a",
  },
  {
    pid: 9,
    lpSymbol: "BTCB-WBNB LP",
    lpAddresses: {
      97: "",
      56: "0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082",
    },
    token: serializedTokens.btcb,
    quoteToken: serializedTokens.wbnb,
    strat: "0xb86B5F43565206C3f24902E8a9eEd2A58e103821",
  },
  {
    pid: 10,
    lpSymbol: "ETH-USDC LP",
    lpAddresses: {
      97: "",
      56: "0xEa26B78255Df2bBC31C1eBf60010D78670185bD0",
    },
    token: serializedTokens.eth,
    quoteToken: serializedTokens.usdc,
    strat: "0xA60D987B42824ED123B7f2ba0d7054E67fFd67C2",
  },
  {
    pid: 11,
    lpSymbol: "BTCB-BUSD LP",
    lpAddresses: {
      97: "",
      56: "0xF45cd219aEF8618A92BAa7aD848364a158a24F33",
    },
    token: serializedTokens.btcb,
    quoteToken: serializedTokens.busd,
    strat: "0xdE7f6Ea07E1EA4f27F094C603863Bc19F2d527D1",
  },
  {
    pid: 12,
    lpSymbol: "USDT-WBNB LP",
    lpAddresses: {
      97: "",
      56: "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE",
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.wbnb,
    strat: "0x26F2FBdbA13261f022805640Bc8416D532837bC2",
  },
  {
    pid: 13,
    lpSymbol: "CAKE-BUSD LP",
    lpAddresses: {
      97: "",
      56: "0x804678fa97d91B974ec2af3c843270886528a9E6",
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.busd,
    strat: "0x8380Ca5273215f82B4AECde0675d6a646Cb958C4",
  },
  {
    pid: 14,
    lpSymbol: "CAKE-USDT LP",
    lpAddresses: {
      97: "",
      56: "0xA39Af17CE4a8eb807E076805Da1e2B8EA7D0755b",
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.usdt,
    strat: "0x33eB208f09b040c344268e30cb7D2Bc27db079C1",
  },
  {
    pid: 15,
    lpSymbol: "CAKE-WBNB LP",
    lpAddresses: {
      97: "",
      56: "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0",
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
    strat: "0x22ecD748CCB05bB5877e48c16F691d9a1b91f209",
  },
  {
    pid: 16,
    lpSymbol: "BNB-BELT LP",
    lpAddresses: {
      97: "",
      56: "0xF3Bc6FC080ffCC30d93dF48BFA2aA14b869554bb",
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.belt,
    strat: "0xbee73A4431992fC0901A801e07f247728Ed515E8",
  },
  {
    pid: 17,
    lpSymbol: "DOT-WBNB LP",
    lpAddresses: {
      97: "",
      56: "0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF",
    },
    token: serializedTokens.dot,
    quoteToken: serializedTokens.wbnb,
    strat: "0x90893d1F9F76A28C141164fada787c6fc4280C29",
  },
  {
    pid: 18,
    lpSymbol: "WBNB-LINK LP",
    lpAddresses: {
      97: "",
      56: "0x824eb9faDFb377394430d2744fa7C42916DE3eCe",
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.link,
    strat: "0x837c04e03944018c634da520d84B1439d7c04270",
  },
];

export default farms;
