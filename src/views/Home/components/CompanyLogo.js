import React from "react";
import styled from "styled-components";
import { Flex, Link } from "@pancakeswap/uikit";
import { useThemeManager } from "../../../store/slices/user-slice/hooks";
import CoinMarketcapImage1 from "../../../assets/images/company_logo/coinmarketcap1.png";
import CoinMarketcapImage2 from "../../../assets/images/company_logo/coinmarketcap2.png";
import CoingeckoImage1 from "../../../assets/images/company_logo/coingecko1.png";
import CoingeckoImage2 from "../../../assets/images/company_logo/coingecko2.png";
import CryptoImage1 from "../../../assets/images/company_logo/crypto-com1.png";
import CryptoImage2 from "../../../assets/images/company_logo/crypto-com2.png";
import DexToolsImage1 from "../../../assets/images/company_logo/dextools1.svg";
import DexToolsImage2 from "../../../assets/images/company_logo/dextools2.svg";
import SolidproofImage1 from "../../../assets/images/company_logo/solidproof1.png";
import SolidproofImage2 from "../../../assets/images/company_logo/solidproof2.png";
import BscscanImage1 from "../../../assets/images/company_logo/bscscan1.png";
import BscscanImage2 from "../../../assets/images/company_logo/bscscan2.png";
// import MarketwatchImage1 from "../../../assets/images/company_logo/marketwatch1.png";
// import MarketwatchImage2 from "../../../assets/images/company_logo/marketwatch2.jpg";
import BezingaImage1 from "../../../assets/images/company_logo/bezinga1.png";
import BezingaImage2 from "../../../assets/images/company_logo/bezinga2.png";
import YahooFinanceImage1 from "../../../assets/images/company_logo/yahoo-finance1.png"
import YahooFinanceImage2 from "../../../assets/images/company_logo/yahoo-finance2.png"

const LogoContainer = styled(Flex)`
  padding: 12px 24px;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  width: 44%;
  margin: 8px 0;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 22%;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 11%;
  }
`;

const LogoBox = styled.img`
  width: 100%;
`;

const CompanyLogo = () => {
  const [isDark] = useThemeManager();
  return (
    <LogoContainer justifyContent="space-between" alignItems="center">
      <StyledLink
        href="https://coinmarketcap.com/currencies/haven-token/"
        target="_blank"
      >
        <LogoBox
          src={isDark ? CoinMarketcapImage1 : CoinMarketcapImage2}
          alt=""
        />
      </StyledLink>
      <StyledLink
        href="https://www.coingecko.com/en/coins/haven-token"
        target="_blank"
      >
        <LogoBox src={isDark ? CoingeckoImage1 : CoingeckoImage2} alt="" />
      </StyledLink>
      <StyledLink
        href="https://crypto.com/price/haven-token"
        target="_blank"
      >
        <LogoBox src={isDark ? CryptoImage1 : CryptoImage2} alt="" />
      </StyledLink>
      <StyledLink
        href="https://www.dextools.io/app/bsc/pair-explorer/0x63373252f5090b3cee061348d627a17cf6ab360f"
        target="_blank"
      >
        <LogoBox src={isDark ? DexToolsImage1 : DexToolsImage2} alt="" />
      </StyledLink>
      <StyledLink
        href="https://twitter.com/SolidProof_io/status/1455647890483908615"
        target="_blank"
      >
        <LogoBox src={isDark ? SolidproofImage1 : SolidproofImage2} alt="" />
      </StyledLink>
      <StyledLink
        href="https://bscscan.com/address/0x9cae753b661142ae766374cefa5dc800d80446ac#code"
        target="_blank"
      >
        <LogoBox src={isDark ? BscscanImage1 : BscscanImage2} alt="" />
      </StyledLink>
      <StyledLink
        href="https://finance.yahoo.com/news/safe-haven-gets-listed-pancakeswap-124800032.html"
        target="_blank"
      >
        <LogoBox src={isDark ? YahooFinanceImage1 : YahooFinanceImage2} alt="" />
      </StyledLink>
      {/* <StyledLink
        href="https://www.marketwatch.com/press-release/safe-haven-gets-listed-on-pancakeswap-with-8-reward-distribution-to-holders-2021-12-06?tesla=y"
        target="_blank"
      >
        <LogoBox src={isDark ? MarketwatchImage1 : MarketwatchImage2} alt="" />
      </StyledLink> */}
      <StyledLink
        href="https://www.benzinga.com/pressreleases/21/12/24476483/safe-haven-gets-listed-on-pancakeswap-with-8-reward-distribution-to-holders"
        target="_blank"
      >
        <LogoBox src={isDark ? BezingaImage1 : BezingaImage2} alt="" />
      </StyledLink>
    </LogoContainer>
  );
};

export default CompanyLogo;
