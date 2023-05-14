import { displayNumber } from "./formatBalance";
const DAYS_TO_CALCULATE_AGAINST = [1, 7, 30, 365, 1825];

export const getInterestBreakdown = ({
  principalInUSD,
  apr,
  earningTokenPrice,
  compoundFrequency = 1,
  performanceFee = 0,
}) => {
  const timesCompounded = 365 * compoundFrequency;
  const aprAsDecimal = apr / 100;

  const isHighValueToken = Math.round(earningTokenPrice / 1000) > 0;
  const roundingDecimalsNew = isHighValueToken ? 5 : 3;

  return DAYS_TO_CALCULATE_AGAINST.map((days) => {
    const daysAsDecimalOfYear = days / 365;
    let principal = principalInUSD / earningTokenPrice;
    if (principal === 0) {
      principal = 1 / Math.pow(10, 18);
    }
    let interestEarned = principal * aprAsDecimal * daysAsDecimalOfYear;
    if (timesCompounded !== 0) {
      const accruedAmount =
        principal *
        (1 + aprAsDecimal / timesCompounded) **
          (timesCompounded * daysAsDecimalOfYear);
      interestEarned = accruedAmount - principal;
      if (performanceFee) {
        const performanceFeeAsDecimal = performanceFee / 100;
        const performanceFeeAsAmount = interestEarned * performanceFeeAsDecimal;
        interestEarned -= performanceFeeAsAmount;
      }
    }
    return parseFloat(interestEarned.toFixed(roundingDecimalsNew));
  });
};

const roundToTwoDp = (number) => Math.round(number * 100) / 100;

export const calculateSltEarnedPerThousandDollars = ({
  numberOfDays,
  farmApr,
  earningTokenPrice,
}) => {
  const timesCompounded = 365;
  const apyAsDecimal = farmApr / 100;
  const daysAsDecimalOfYear = numberOfDays / timesCompounded;
  const principal = 1000 / earningTokenPrice;

  const finalAmount =
    principal *
    (1 + apyAsDecimal / timesCompounded) **
      (timesCompounded * daysAsDecimalOfYear);

  const interestEarned = finalAmount - principal;
  return roundToTwoDp(interestEarned);
};

export const apyModalRoi = ({ amountEarned, amountInvested }) => {
  const percentage = (amountEarned / amountInvested) * 100;
  return displayNumber(percentage);
};
