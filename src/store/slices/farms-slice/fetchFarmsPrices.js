import BigNumber from "bignumber.js";
import { BIG_ONE, BIG_ZERO } from "../../../utils/bigNumber";
import { filterFarmsByQuoteToken } from "../../../utils/farmsPriceHelpers";
import tokens from "../../../constants/tokens";

const getFarmFromTokenSymbol = (farms, tokenSymbol, preferredQuoteTokens) => {
  const farmsWithTokenSymbol = farms.filter(
    (farm) => farm.token.symbol === tokenSymbol
  );
  const filteredFarm = filterFarmsByQuoteToken(
    farmsWithTokenSymbol,
    preferredQuoteTokens
  );
  return filteredFarm;
};

const getFarmBaseTokenPrice = (farm, quoteTokenFarm, bnbPriceBusd) => {
  const hasTokenPriceVsQuote = Boolean(farm.tokenPriceVsQuote);

  if (farm.quoteToken.symbol === tokens.busd.symbol) {
    return hasTokenPriceVsQuote
      ? new BigNumber(farm.tokenPriceVsQuote)
      : BIG_ZERO;
  }

  if (farm.quoteToken.symbol === tokens.wbnb.symbol) {
    return hasTokenPriceVsQuote
      ? bnbPriceBusd.times(farm.tokenPriceVsQuote)
      : BIG_ZERO;
  }

  if (!quoteTokenFarm) {
    return BIG_ZERO;
  }
  
  if (quoteTokenFarm.quoteToken.symbol === tokens.wbnb.symbol) {
    const quoteTokenInBusd = bnbPriceBusd.times(
      quoteTokenFarm.tokenPriceVsQuote
    );
    return hasTokenPriceVsQuote && quoteTokenInBusd
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInBusd)
      : BIG_ZERO;
  }

  if (quoteTokenFarm.quoteToken.symbol === tokens.busd.symbol) {
    const quoteTokenInBusd = quoteTokenFarm.tokenPriceVsQuote;
    return hasTokenPriceVsQuote && quoteTokenInBusd
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInBusd)
      : BIG_ZERO;
  }

  return BIG_ZERO;
};

const getFarmQuoteTokenPrice = (farm, quoteTokenFarm, bnbPriceBusd) => {
  if (farm.quoteToken.symbol === "BUSD") {
    return BIG_ONE;
  }

  if (farm.quoteToken.symbol === "WBNB") {
    return bnbPriceBusd;
  }

  if (!quoteTokenFarm) {
    return BIG_ZERO;
  }

  if (quoteTokenFarm.quoteToken.symbol === "WBNB") {
    return quoteTokenFarm.tokenPriceVsQuote
      ? bnbPriceBusd.times(quoteTokenFarm.tokenPriceVsQuote)
      : BIG_ZERO;
  }

  if (quoteTokenFarm.quoteToken.symbol === "BUSD") {
    return quoteTokenFarm.tokenPriceVsQuote
      ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote)
      : BIG_ZERO;
  }

  return BIG_ZERO;
};

const fetchFarmsPrices = async (farms) => {
  const bnbBusdFarm = farms.find((farm) => farm.pid === 2);
  const bnbPriceBusd = bnbBusdFarm.tokenPriceVsQuote
    ? new BigNumber(bnbBusdFarm.tokenPriceVsQuote)
    : BIG_ZERO;
  const farmsWithPrices = farms.map((farm) => {
    const quoteTokenFarm = getFarmFromTokenSymbol(
      farms,
      farm.quoteToken.symbol
    );
    let tokenPriceBusd = getFarmBaseTokenPrice(
      farm,
      quoteTokenFarm,
      bnbPriceBusd
    );
    const quoteTokenPriceBusd = getFarmQuoteTokenPrice(
      farm,
      quoteTokenFarm,
      bnbPriceBusd
    );
    if (isNaN(tokenPriceBusd.toString())) {
      tokenPriceBusd = BIG_ZERO;
    }
    return {
      ...farm,
      tokenPriceBusd: tokenPriceBusd.toJSON(),
      quoteTokenPriceBusd: quoteTokenPriceBusd.toJSON(),
    };
  });
  return farmsWithPrices;
};

export default fetchFarmsPrices;
