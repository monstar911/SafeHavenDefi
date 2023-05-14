import { serializeTokens } from "./tokens";
const serializedTokens = serializeTokens();

const ifos = [
  {
    pid: 0,
    tokenLabel: "BUSD",
    token: serializedTokens.busd,
    isActive: true,
  },

  {
    pid: 1,
    tokenLabel: "BUSD",
    token: serializedTokens.busd,
    isActive: true,
  },
];

export default ifos;
