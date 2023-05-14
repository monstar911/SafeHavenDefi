import { serializeTokens } from './tokens'

const serializedTokens = serializeTokens()

const pools = [
  {
    sousId: 1,
    stakingToken: serializedTokens.slt,
    earningToken: serializedTokens.busd,
    contractAddress: {
      97: '',
      56: '0xb2cb31E0b2e8a130d2C5D35347D1CE78a99e6CE4',
    },
    isFinished: false,
  }
]

export default pools
