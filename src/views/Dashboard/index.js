import { useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Skeleton, Button, Input, Flex, Text } from "@pancakeswap/uikit";
import styled from "styled-components";
import Web3 from "web3";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { getDividendDistributorAddress } from "../../utils/addressHelpers";
import dividendDistributorABI from "../../abi/dividendDistributorContract.json";

const DashboardView = styled(Flex)`
  overflow: hidden;
  width: 90%;
  max-width: 830px;
  margin: auto;
  margin-top: 60px;
  margin-bottom: 50px;
`;

const StyledCard = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: relative;
  z-index: 2;
  background-color: ${({ theme }) => theme.card.background};

  border-radius: 10px;
  padding: 24px 16px;
  height: 100%;
`;

const TradingVolumeText = styled(Text)`
  font-weight: bolder;
  font-size: 20px;
  margin: 0px 30px;
  white-space: nowrap;
  margin-bottom: 8px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 0px;
    font-size: 24px;
  }
`;

const TradingText = styled(Text)`
  justify-content: center !important;
  font-size: 18px;
  font-weight: bolder;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 28px;
  }
`;

const CardTitle = styled(Text)`
  font-family: Montserrat Medium;
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 16px;
`;

const CardValue = styled(Text)`
  font-family: Montserrat Bold;
  font-weight: bold;
  font-size: 24px;
`;

const TradingDescription = styled(Text)`
  display: inline-block;
  width: 100%;
  font-weight: bolder;
  font-size: 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 80%;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 24px;
  }
`;

const TradingInfo = styled.div`
  margin: 15px auto;
  width: 65%;
`;

const MiniContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`;

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
);

function Dashboard() {
  const isAppLoading = useSelector((state) => state.app.loading);
  const app = useSelector((state) => state.app);
  const { account } = useActiveWeb3React();

  const [volume, setVolume] = useState(0);
  const [usersReward, setUsersReward] = useState(0);

  const changeVolume = (e) => {
    let value = parseInt(e.target.value, 10);
    if (e.target.value === "") {
      setVolume(e.target.value);
    }
    if (!value) {
      return;
    }
    setVolume(value);
    let percentageOfUserBalance = app.balanceOfUser / app.circulatingSupply;
    let volumeOfRewards = value * 0.08;
    setUsersReward(percentageOfUserBalance * volumeOfRewards);
  };

  const claimBNB = async () => {
    if (!account) {
      alert("Please connect your wallet");
      return;
    }
    const dividendDistributorContract = await new web3.eth.Contract(
      dividendDistributorABI,
      getDividendDistributorAddress()
    );
    let Data = await dividendDistributorContract.methods
      .claimDividend()
      .encodeABI();

    let Txdetail = {
      from: account,
      to: getDividendDistributorAddress(),
      value: web3.utils.toHex(web3.utils.toWei("0")),
      gasPrice: web3.utils.toHex(web3.utils.toWei("5", "gwei")),
      gasLimit: web3.utils.toHex(web3.utils.toWei("100000", "gwei")),
      data: Data,
    };
    window.ethereum
      .request({ method: "eth_sendTransaction", params: [Txdetail] })
      .then(async (res) => {
        var ethFlag = true;
        while (ethFlag) {
          // eslint-disable-next-line
          await web3.eth.getTransactionReceipt(res, (error, receipt) => {
            if (error) {
              console.log(error);
              alert("claim failed");
            } else if (receipt == null) {
            } else {
              console.log("confirm", receipt);
              alert("Claim Successfull");
              ethFlag = false;
            }
          });
        }
      });
  };

  return (
    <DashboardView
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <StyledCard>
            <CardTitle color="lightText">Current Price</CardTitle>
            <CardValue color="text">
              {isAppLoading ? (
                <Skeleton width={100} />
              ) : (
                app.priceOfOneHaven.toFixed(3)
              )}
            </CardValue>
          </StyledCard>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <StyledCard>
            <CardTitle color="lightText">Market Cap</CardTitle>
            <CardValue color="text">
              {isAppLoading ? (
                <Skeleton width={160} />
              ) : (
                `$ ${new Intl.NumberFormat("en-US").format(app.marketCap)}`
              )}
            </CardValue>
          </StyledCard>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <StyledCard>
            <CardTitle color="lightText">Liquidity Pool Balance</CardTitle>
            <CardValue color="text">
              {isAppLoading ? (
                <Skeleton width={160} />
              ) : (
                `$ ${new Intl.NumberFormat("en-US").format(
                  app.liquidityPoolInDollars
                )}`
              )}
            </CardValue>
          </StyledCard>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <StyledCard>
            <CardTitle color="lightText">Circulating Supply</CardTitle>
            <CardValue color="text">
              {isAppLoading ? (
                <Skeleton width={200} />
              ) : (
                new Intl.NumberFormat("en-US").format(app.circulatingSupply)
              )}
            </CardValue>
          </StyledCard>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <StyledCard>
            <CardTitle color="lightText">Total $Haven Holdings</CardTitle>
            <CardValue color="text">
              {isAppLoading ? <Skeleton width={200} /> : app.balanceOfUser}
            </CardValue>
          </StyledCard>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <StyledCard>
            <CardTitle color="lightText">Total ETH Paid</CardTitle>
            <CardValue color="text">
              {isAppLoading ? (
                <Skeleton width={200} />
              ) : (
                `${new Intl.NumberFormat("en-US").format(
                  app.totalRealised
                )} ETH `
              )}
            </CardValue>
          </StyledCard>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <StyledCard>
            <CardTitle color="lightText">Pending ETH Rewards</CardTitle>
            <CardValue color="text">
              {isAppLoading ? (
                <Skeleton width={200} />
              ) : (
                `${app.unpaidEarnings.toFixed(8)} ETH `
              )}
            </CardValue>
          </StyledCard>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <StyledCard>
            <CardTitle color="lightText">Sell Tax</CardTitle>
            <CardValue color="text">
              {isAppLoading ? (
                <Skeleton width={100} />
              ) : (
                `${app.taxSaleInPercentage} %`
              )}
            </CardValue>
          </StyledCard>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <StyledCard>
            <CardTitle color="lightText">Buy Tax</CardTitle>
            <CardValue color="text">
              {isAppLoading ? (
                <Skeleton width={100} />
              ) : (
                `${app.buyTaxInPercentage} % `
              )}
            </CardValue>
          </StyledCard>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <StyledCard>
            <CardTitle color="lightText">Total Burned</CardTitle>
            <CardValue color="text">
              {isAppLoading ? (
                <Skeleton width={200} />
              ) : (
                new Intl.NumberFormat("en-US").format(app.burntTokens)
              )}
            </CardValue>
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <Flex justifyContent="space-around">
            <Button
              as="a"
              href="https://pancakeswap.finance/swap?outputCurrency=0x9caE753B661142aE766374CEFA5dC800d80446aC"
              external
              style={{ textDecoration: "none" }}
            >
              BUY $HAVEN
            </Button>
            <Button onClick={claimBNB}>CLAIM ETH</Button>
          </Flex>
        </Grid>

        <Grid item xs={12}>
          <StyledCard flexDirection="column">
            <TradingDescription color="lightText">
              Estimations are based on a default of the last 24h of trading
              volume. Change the volume to predict earnings based on other
              volume figures.
            </TradingDescription>
            <TradingInfo>
              <MiniContainer justifyContent="space-around" alignItems="center">
                <TradingVolumeText color="text">
                  Trading Volume = $
                </TradingVolumeText>
                <Input type="text" value={volume} onChange={changeVolume} />
              </MiniContainer>
            </TradingInfo>
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <StyledCard justifyContent="center">
            <TradingText color="lightText">
              YOUR ETH EARNINGS 24H : {usersReward.toFixed(5)} USD
            </TradingText>
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <StyledCard justifyContent="center">
            <TradingText color="lightText">
              {isAppLoading ? (
                <Skeleton width={200} />
              ) : (
                `TOTAL PAID TO HOLDERS : ${new Intl.NumberFormat(
                  "en-US"
                ).format(app.totalDistributed)} ETH`
              )}
            </TradingText>
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <StyledCard justifyContent="center">
            <TradingText color="lightText">
              {isAppLoading ? (
                <Skeleton width={200} />
              ) : (
                `$HAVEN BUYBACK BALANCE : ${new Intl.NumberFormat(
                  "en-US"
                ).format(app.balanceOfContract)} BNB`
              )}
            </TradingText>
          </StyledCard>
        </Grid>
      </Grid>
    </DashboardView>
  );
}

export default Dashboard;
