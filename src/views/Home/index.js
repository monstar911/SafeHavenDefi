import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import ConnectWalletButton from "../../components/ConnectWalletButton";
import {
  Button,
  Skeleton,
  Image,
  Flex,
  Text,
  Link,
  Box,
} from "@pancakeswap/uikit";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import Page from "../../components/Layout/Page";
import Chart from "./components/Chart";
import SltHarvestBalance from "./components/SltHarvestBalance";
import SltWalletBalance from "./components/SltWalletBalance";
import TransactionTaxBox from "./components/TransactionTaxBox";
import CompanyLogo from "./components/CompanyLogo";
import { useThemeManager } from "../../store/slices/user-slice/hooks";
import useAllEarnings from "../../hooks/useAllEarnings";
import { useTVL } from "../../hooks/useSafeFarms";
import useFarmsWithBalance from "../../hooks/useFarmsWithBalance";
import useAllHarvest from "./hooks/useAllHarvest";
import useTokenBalance from "../../hooks/useTokenBalance";
import { getSltTokenAddress } from "../../utils/addressHelpers";
import { getBalanceNumber, displayNumber } from "../../utils/formatBalance";
import Logo2 from "../../assets/images/logo2.png";
import Ecosystem from "../../assets/images/ecosystem.webp";
import EthRewards from "../../assets/images/Eth-Rewards.webp";
import HavenAutomaticEthereuemRewards from "../../assets/images/Haven-Automatic-Ethereuem-Rewards.webp";
import HavenBuyBackBurnWhiteFill from "../../assets/images/Haven-Buy-Back-Burn-White-Fill.webp";
import HavenContests3 from "../../assets/images/Haven-Contests3.webp";
import HavenEcosystem3 from "../../assets/images/Haven-Ecosystem3.webp";
import Marketing from "../../assets/images/Marketing.webp";
import EarnEthPassivelyMedia from "../../assets/media/Earn_Eth_Passively.mp4";

const useStyles = makeStyles({
  explorerButton: {
    textDecoration: "none!important",
    whiteSpace: "nowrap",
  },
  earnEthPassivelyVideo: {
    alignSelf: "center",
    width: "100%",
    maxWidth: "364px",
    height: "auto",
    objectFit: "cover",
    objectPosition: "center center",
    "@media (min-width: 852px)": {
      maxWidth: "415px",
    },
    "@media (min-width: 1080px)": {
      alignSelf: "flex-end",
      maxWidth: "none",
      width: "auto",
      height: "221px",
    },
  },
});

const Label = styled.div`
  color: ${({ theme }) => theme.colors.lightText};
  font-size: 14px;
`;

const PageHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.pageHeaderBackground};
  margin-bottom: 24px;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 200px;
  background: ${({ theme }) => theme.card.background};
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 48%;
    margin-bottom: 0;
  }
`;

const Title = styled(Text)`
  font-weight: 600;
  line-height: 1.1;
  font-size: 28px;
  margin-bottom: 24px;
  margin-top: 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 36px;
  }
`;

const TVLValue = styled(Text)`
  font-size: 28px;
  margin: 0;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 40px;
  }
`;

const TokenCardBox = styled.div`
  border: 2px solid #a5a5a5aa;
  background-color: ${({ theme }) => theme.card.background};
  padding: 10px 12px;
  font-size: 15px;
  border-radius: 20px;
  &:first-child {
    margin-right: 20px;
  }
`;

const InfoContent = styled(Flex)`
  background: ${({ theme }) => theme.colors.customBackground};
  padding: 32px 32px 16px;
  margin-bottom: 32px;

  & > div {
    padding: 0 12px;
    width: 100%;
    margin-bottom: 16px;
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 33.33%;
    }
  }
`;

const EarnSafehavenListItemTitle = styled(Text)`
  font-size: 14px;
  margin-bottom: 16px;
  white-space: nowrap;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
  }
`;

const EarnSafehavenListItemText = styled(Text)`
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
`;

const ContractText = styled(Text)`
  word-break: break-all;
  font-size: 18px;
  text-align: center;
`;

const SltInfoTitle = styled(Text)`
  font-size: 16px;
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
  }
`;

const SltInfoValue = styled(Flex)`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 32px;
  }
`;

const HomeSafeHavenBox = styled(Flex)`
  padding: 40px 0;
  background: ${({ theme }) => theme.colors.customBackground};
`;

const EarnSafeHavenTitle = styled(Text)`
  font-size: 32px;
  margin-bottom: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 46px;
    margin-bottom: 30px;
  }
`;

const EarnSafeHavenListItem = styled(Flex)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 44%;
  }
`;

const EarnSafeHavenListItemImage = styled.img`
  min-width: 40px;
  margin-right: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 74px;
    margin-right: 20px;
  }
`;

const EcosystemImage = styled.img`
  width: 140px;
  height: 140px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 200px;
    height: 200px;
  }
`;

const HomeHavenIntroductionMain = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  ${Text} {
    max-width: 100%;
    font-size: 16px;
    margin-bottom: 16px;

    ${({ theme }) => theme.mediaQueries.sm} {
      max-width: 60%;
      font-size: 20px;
      margin-bottom: 0;
    }
  }
`;

const HomeHavenIntroduction = styled(Text)`
  max-width: 100%;
  font-size: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 80%;
    font-size: 28px;
  }
`;

const HomeViewContentHeader = styled(Flex)`
  margin-bottom: 32px;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`;

const HomePageHeaderImage = styled(Image)`
  width: 140px;
  height: 140px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 200px;
    height: 200px;
  }
`;

const HomePageHeaderTitle = styled(Text)`
  user-select: none;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 36px;
  }
`;

const HomePageHeaderText = styled(Text)`
  user-select: none;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
`;

const TaxBoxContainer = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
  }
`;

const TransactionTaxBoxContent = styled(Box)`
  margin-bottom: 24px;
  ${({ theme }) => theme.mediaQueries.xl} {
    margin-right: 24px;
    margin-bottom: 0;
  }
`;

const safeHavenTextLists = [
  {
    image: HavenEcosystem3,
    title: (
      <EarnSafehavenListItemTitle color="text">
        <b>Haven Token </b>(Core Token)
      </EarnSafehavenListItemTitle>
    ),
    text: "With just a 3.1m supply, Haven Token is the next generation of reflection, and the best Binance pegged ETH reflection token. It is at the core of the SafeHaven Defi Ecosystem. So buy and hold it to enjoy ETH rewards and huge benefits within the ecosystem.",
  },
  {
    image: HavenAutomaticEthereuemRewards,
    title: (
      <EarnSafehavenListItemTitle color="text">
        <b>SafeLayer Token-SLT </b>(Farm Token)
      </EarnSafehavenListItemTitle>
    ),
    text: "Safe Layer Token (SLT) is the second native token of the Safehaven Defi Ecosystem. SLT is rewarded to liquidity providers and enable them to enjoy high, stable and sustainable yields through endless amounts of layers.",
  },
  {
    image: EthRewards,
    title: (
      <EarnSafehavenListItemTitle color="text">
        <b>Daily Ethereum </b>Rewards
      </EarnSafehavenListItemTitle>
    ),
    text: "Holding Haven Tokens gives you daily automatic Eth reward depending on volume. The reward is auto distributed into your wallet as ETH BEP-20, which serves as a profit without selling your tokens. 7% of buy/sell taxes go to the holder’s Ethereum reward pool, rewards are boosted weekly with the platform's profits.",
  },
  {
    image: Marketing,
    title: (
      <EarnSafehavenListItemTitle color="text">
        <b>Endless </b>Marketing
      </EarnSafehavenListItemTitle>
    ),
    text: "A Marketing & Development tax supports continuous marketing, community contests & the development of new SafeHaven Defi Products.",
  },
  {
    image: HavenBuyBackBurnWhiteFill,
    title: (
      <EarnSafehavenListItemTitle color="text">
        <b>Buy-Back </b>and Burn
      </EarnSafehavenListItemTitle>
    ),
    text: "$HAVEN Buy-Back function uses a certain % of each transaction to lock and store WBNB in the HAVEN contract. This function uses trading algorithms and price feeds to trigger the buy-back during dips or low volume.",
  },
  {
    image: HavenContests3,
    title: (
      <EarnSafehavenListItemTitle color="text">
        <b>Community </b>Contests
      </EarnSafehavenListItemTitle>
    ),
    text: "There will be different community contests to ensure that the most active and loyal community members are rewarded for promoting Haven and SafeHaven Defi products.",
  },
];

const scriptUrl = "https://static.coinstats.app/widgets/coin-chart-widget.js";
const scriptTagId = "coinChartWidgetScript";

export default function Home() {
  const [isDark] = useThemeManager();
  const classes = useStyles();
  const [pendingTx, setPendingTx] = useState(false);
  const { account } = useWeb3React();
  const isAppLoading = useSelector((state) => state.app.loading);
  const app = useSelector((state) => state.app);

  const sltTokenPrice = app.priceOfOneSLT;
  const sltBalance = getBalanceNumber(
    useTokenBalance(getSltTokenAddress()).balance
  );
  const allEarnings = useAllEarnings();
  const tvlData = useTVL();
  const tvlValue = tvlData.reduce((partial_sum, a) => partial_sum + a, 0);
  const farmsWithBalance = useFarmsWithBalance();
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return (
      accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
    );
  }, 0);
  const balancesWithValue = farmsWithBalance.filter(
    (balanceType) => balanceType.balance.toNumber() > 0
  );

  const { onReward } = useAllHarvest(
    balancesWithValue.map((farmWithBalance) => farmWithBalance.pid)
  );

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true);
    try {
      await onReward();
    } catch (error) {
    } finally {
      setPendingTx(false);
    }
  }, [onReward]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.id = scriptTagId;

    document.body.appendChild(script);

    return () => {
      const script = document.getElementById(scriptTagId);
      if (script) {
        script.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PageHeader
        style={{
          position: "relative",
          zIndex: "1",
          padding: "16px 16px 32px",
        }}
      >
        <wix-bg-image
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: "-1",
            width: "100%",
            height: "100%",
            backgroundImage:
              "url('https://static.wixstatic.com/media/0da768_8b89980121844d37be099f0dbe33e3e3.png/v1/crop/x_0,y_0,w_6,h_6,enc_auto/0da768_8b89980121844d37be099f0dbe33e3e3.png')",
            backgroundSize: "auto",
            backgroundRepeat: "repeat",
            backgroundPosition: "center center",
          }}
        ></wix-bg-image>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: "-1",
          }}
        >
          <video
            autoplay=""
            role="presentation"
            playsinline
            preload="auto"
            muted
            loop
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
            }}
          >
            <source
              src="https://video.wixstatic.com/video/7733e8_3833a23222b84a30ba644e124e0c2840/1080p/mp4/file.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: isDark ? "#18253285" : "#00336685",
            zIndex: "-1",
          }}
        ></div>
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
          mb="20px"
        >
          <HomePageHeaderImage src={Logo2} alt="" />
        </Flex>
        <HomePageHeaderTitle color="textColor">
          Earn passive income with crypto.
        </HomePageHeaderTitle>
        <HomePageHeaderText color="textColor">
          SafeHavenDapp makes it easy to make your crypto work for you.
        </HomePageHeaderText>
        <Flex justifyContent="center" flexWrap="wrap" mb="16px">
          <Button
            as={Link}
            href="https://pancakeswap.finance/swap?outputCurrency=0x9caE753B661142aE766374CEFA5dC800d80446aC"
            target="_blank"
            className={classes.explorerButton}
            mx="8px"
            mb="16px"
            minWidth="140px"
          >
            Buy HAVEN
          </Button>
          <Button
            as={Link}
            href="https://pancakeswap.finance/swap?outputCurrency="
            target="_blank"
            className={classes.explorerButton}
            mx="8px"
            mb="16px"
            minWidth="140px"
          >
            Buy SLT
          </Button>
          <Button
            as={Link}
            href="https://github.com/solidproof/kyc-certificates/blob/main/KYC_Certificate_SafeHaven.png/"
            target="_blank"
            className={classes.explorerButton}
            mx="8px"
            mb="16px"
            minWidth="140px"
          >
            KYC
          </Button>
        </Flex>
        <div>
          <ContractText color="textColor">HAVEN Contract:</ContractText>
          <ContractText fontWeight="bold" mb="16px" color="textColor">
            0x9caE753B661142aE766374CEFA5dC800d80446aC
          </ContractText>
          <ContractText color="textColor">SLT Contract:</ContractText>
          <ContractText fontWeight="bold" color="textColor">
            0xAaE8bc1BC5527217393228af82b2AD4fAecED99F
          </ContractText>
        </div>
      </PageHeader>
      <CompanyLogo />
      <Page>
        <HomeViewContentHeader justifyContent="space-between">
          <StyledCard>
            <Title color="lightText">Farms & Staking</Title>
            <Flex mb="20px">
              <TokenCardBox>
                <Label>
                  {isAppLoading ? (
                    <Skeleton width={50} />
                  ) : (
                    `~$${(sltTokenPrice * earningsSum)?.toFixed(2)}`
                  )}
                </Label>
                <SltHarvestBalance earningsSum={earningsSum?.toFixed(2)} />
                <Label>
                  <b>SLT</b> to Harvest
                </Label>
              </TokenCardBox>
              <TokenCardBox>
                <Label>
                  {isAppLoading ? (
                    <Skeleton width={50} />
                  ) : (
                    `~$${(sltTokenPrice * sltBalance)?.toFixed(2)}`
                  )}
                </Label>
                <SltWalletBalance sltBalance={sltBalance?.toFixed(2)} />
                <Label>
                  <b>SLT</b> in Wallet
                </Label>
              </TokenCardBox>
            </Flex>
            {account ? (
              <Button
                disabled={balancesWithValue.length <= 0 || pendingTx}
                onClick={harvestAllFarms}
              >
                Harvest all ({balancesWithValue.length})
              </Button>
            ) : (
              <ConnectWalletButton style={{ width: "100%" }} />
            )}
          </StyledCard>
          <StyledCard>
            <Title color="lightText" textAlign="center">
              Total Value Locked (TVL)
            </Title>
            <TVLValue color="text" fontWeight="600">
              {isAppLoading ? (
                <Skeleton width={100} />
              ) : (
                `$ ${displayNumber(tvlValue)}`
              )}
            </TVLValue>
          </StyledCard>
        </HomeViewContentHeader>
      </Page>
      <InfoContent justifyContent="space-around" flexWrap="wrap">
        <div>
          <SltInfoTitle textAlign="center" color="text">
            SLT Total Supply
          </SltInfoTitle>
          <SltInfoValue justifyContent="center">
            {isAppLoading ? (
              <Skeleton width={100} />
            ) : (
              new Intl.NumberFormat("en-US").format(
                app.slttotalSupply?.toFixed(2)
              )
            )}
          </SltInfoValue>
        </div>
        <div>
          <SltInfoTitle textAlign="center" color="text">
            Market Cap
          </SltInfoTitle>
          <SltInfoValue justifyContent="center">
            {isAppLoading ? (
              <Skeleton width={100} />
            ) : (
              `$ ${new Intl.NumberFormat("en-US").format(
                app.sltmarketCap?.toFixed(2)
              )}`
            )}
          </SltInfoValue>
        </div>
        <div>
          <SltInfoTitle textAlign="center" color="text">
            SLT Price
          </SltInfoTitle>
          <SltInfoValue justifyContent="center">
            {isAppLoading ? (
              <Skeleton width={100} />
            ) : (
              app.priceOfOneSLT.toFixed(3)
            )}
          </SltInfoValue>
        </div>
      </InfoContent>
      <InfoContent justifyContent="space-around" flexWrap="wrap">
        <div>
          <SltInfoTitle textAlign="center" color="text">
            HAVEN Total Supply
          </SltInfoTitle>
          <SltInfoValue justifyContent="center">
            {isAppLoading ? (
              <Skeleton width={100} />
            ) : (
              new Intl.NumberFormat("en-US").format(
                app.circulatingSupply?.toFixed(2)
              )
            )}
          </SltInfoValue>
        </div>
        <div>
          <SltInfoTitle textAlign="center" color="text">
            HAVEN Market Cap
          </SltInfoTitle>
          <SltInfoValue justifyContent="center">
            {isAppLoading ? (
              <Skeleton width={100} />
            ) : (
              `$ ${new Intl.NumberFormat("en-US").format(
                app.marketCap?.toFixed(2)
              )}`
            )}
          </SltInfoValue>
        </div>
        <div>
          <SltInfoTitle textAlign="center" color="text">
            HAVEN Price
          </SltInfoTitle>
          <SltInfoValue justifyContent="center">
            {isAppLoading ? (
              <Skeleton width={100} />
            ) : (
              app.priceOfOneHaven.toFixed(3)
            )}
          </SltInfoValue>
        </div>
      </InfoContent>
      <Page>
        <Chart isDark={isDark} />
      </Page>
      <Page>
        <HomeHavenIntroduction
          color="text"
          fontWeight="600"
          mb="24px"
          mx="auto"
        >
          SafeHaven is developing an ecosystem of DeFi products that will enable
          its users to generate passive income.
        </HomeHavenIntroduction>
        <HomeHavenIntroductionMain>
          <Text color="text">
            SafeHaven Defi Ecosystem is a platform of Defi products that enable
            its users to generate passive income by accessing all the products
            within the ecosystem. All contracts are audited to avert any
            security concerns, and the team behind the ecosystem is KYC’D.
          </Text>
          <EcosystemImage src={Ecosystem} alt="" />
        </HomeHavenIntroductionMain>
      </Page>
      <TaxBoxContainer
        my="24px"
        justifyContent="center"
        alignItems="center"
        px="24px"
      >
        <TransactionTaxBoxContent>
          <TransactionTaxBox />
        </TransactionTaxBoxContent>
        <video
          autoplay=""
          role="presentation"
          playsinline
          preload="auto"
          muted
          loop
          className={classes.earnEthPassivelyVideo}
        >
          <source src={EarnEthPassivelyMedia} type="video/mp4" />
        </video>
      </TaxBoxContainer>
      <HomeSafeHavenBox>
        <Page>
          <EarnSafeHavenTitle color="text" textAlign="center">
            <b>Earn </b>
            with SafeHaven
          </EarnSafeHavenTitle>
          <Flex flexWrap="wrap" justifyContent="space-around">
            {safeHavenTextLists.map((list, key) => (
              <EarnSafeHavenListItem
                key={key}
                alignItems="flex-start"
                mb="24px"
              >
                <EarnSafeHavenListItemImage src={list.image} alt="" />
                <div>
                  {list.title}
                  <EarnSafehavenListItemText fontWeight="600" color="text">
                    {list.text}
                  </EarnSafehavenListItemText>
                </div>
              </EarnSafeHavenListItem>
            ))}
          </Flex>
        </Page>
      </HomeSafeHavenBox>
    </div>
  );
}
