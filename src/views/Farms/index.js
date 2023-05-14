import { useEffect, useCallback, useState, useMemo, useRef } from "react";
import { Route, useRouteMatch, useLocation } from "react-router-dom";
import BigNumber from "bignumber.js";
import { Heading, Toggle, Text, Flex, Skeleton } from "@pancakeswap/uikit";
import styled from "styled-components";
import { useSelector } from "react-redux";
import FlexLayout from "../../components/Layout/Flex";
import Page from "../../components/Layout/Page";
import {
  useFarms,
  usePollFarmsWithUserData,
} from "../../store/slices/farms-slice/hooks";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { getBalanceNumber } from "../../utils/formatBalance";
import { latinise } from "../../utils/latinise";
import { isAddress } from "../../utils/addressHelpers";
import {
  useUserFarmStakedOnly,
  useUserFarmsViewMode,
} from "../../store/slices/user-slice/hooks";
import { ViewMode } from "../../store/slices/user-slice/actions";
import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";
import FarmCard from "./components/FarmCard/FarmCard";
import Table from "./components/FarmTable/FarmTable";
import FarmTabButtons from "./components/FarmTabButtons";
import ToggleView from "./components/ToggleView/ToggleView";
import { DesktopColumnSchema } from "./components/types";
import { AddressZero } from "../../constants";

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`;

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`;

const TimeCountText = styled(Heading)`
  white-space: nowrap;
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
  }
`;
const NUMBER_OF_FARMS_VISIBLE = 12;

const Farms = () => {
  const { account, library } = useActiveWeb3React();
  const { path } = useRouteMatch();
  const { pathname, search } = useLocation();
  let referrer = AddressZero;
  if (search.slice(5) && isAddress(atob(search.slice(5)))) {
    referrer = atob(search.slice(5));
  }
  const { data: farmsLP, userDataLoaded } = useFarms();
  const farmsBlockNumber = useSelector((state) => state.farms.blockNumber);
  const [timeStamp, setTimeStamp] = useState(
    Math.floor(new Date().getTime() / 1000)
  );
  const [startTimeStamp, setStartTimeStamp] = useState(0);
  const [endTimeStamp, setEndTimeStamp] = useState(0);

  const sltTokenPrice = new BigNumber(
    useSelector((state) => state.app.priceOfOneSLT)
  );
  const [query] = useState("");
  const [viewMode, setViewMode] = useUserFarmsViewMode();
  const { observerRef, isIntersecting } = useIntersectionObserver();
  const chosenFarmsLength = useRef(0);

  const isInactive = pathname.includes("history");
  const isActive = !isInactive;

  usePollFarmsWithUserData();

  const userDataReady = !account || (!!account && userDataLoaded);
  const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(isActive);
  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== "0X");
  const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === "0X");
  const stakedOnlyFarms = activeFarms.filter(
    (farm) =>
      farm.userData &&
      new BigNumber(farm.userData.stakedBalance).isGreaterThan(0)
  );

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) =>
      farm.userData &&
      new BigNumber(farm.userData.stakedBalance).isGreaterThan(0)
  );

  const farmsList = useCallback(
    (farmsToDisplay) => {
      let farmsToDisplayWithAPR = farmsToDisplay.map((farm) => {
        return farm;
      });

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase());
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery);
        });
      }
      return farmsToDisplayWithAPR;
    },
    [query]
  );

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(
    NUMBER_OF_FARMS_VISIBLE
  );

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = [];

    if (isActive) {
      chosenFarms = stakedOnly
        ? farmsList(stakedOnlyFarms)
        : farmsList(activeFarms);
    }
    if (isInactive) {
      chosenFarms = stakedOnly
        ? farmsList(stakedInactiveFarms)
        : farmsList(inactiveFarms);
    }
    return chosenFarms.slice(0, numberOfFarmsVisible);
  }, [
    activeFarms,
    farmsList,
    inactiveFarms,
    isActive,
    isInactive,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ]);

  chosenFarmsLength.current = chosenFarmsMemoized.length;

  useEffect(() => {
    if (isIntersecting) {
      setNumberOfFarmsVisible((farmsCurrentlyVisible) => {
        if (farmsCurrentlyVisible <= chosenFarmsLength.current) {
          return farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE;
        }
        return farmsCurrentlyVisible;
      });
    }
  }, [isIntersecting]);

  useEffect(() => {
    let timeInterval;
    const fetchBlockNumber = async () => {
      const currentBlock = await library.getBlock();
      const currentBlockNumber = currentBlock.number;
      const currentTimeStamp = currentBlock.timestamp;
      setStartTimeStamp(
        currentTimeStamp +
          3 * (farmsBlockNumber?.startBlockNumber - currentBlockNumber)
      );
      setEndTimeStamp(
        currentTimeStamp +
          3 * (farmsBlockNumber?.endBlockNumber - currentBlockNumber)
      );
      timeInterval = setInterval(async () => {
        setTimeStamp(Math.floor(new Date().getTime() / 1000));
      }, 1000);
    };
    fetchBlockNumber();
    return () => {
      clearInterval(timeInterval);
    };
  }, [farmsBlockNumber, library]);

  const rowData = chosenFarmsMemoized.map((farm) => {
    const { token, quoteToken } = farm;
    const tokenAddress = token.address;
    const quoteTokenAddress = quoteToken.address;
    const lpLabel =
      farm.lpSymbol &&
      farm.lpSymbol.split(" ")[0].toUpperCase().replace("PANCAKE", "");
    const row = {
      apr: {
        value: farm.apr,
        pid: farm.pid,
        multiplier: farm.multiplier,
        lpLabel,
        lpSymbol: farm.lpSymbol,
        tokenAddress,
        quoteTokenAddress,
        sltTokenPrice,
        originalValue: farm.apr,
      },
      farm: {
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        quoteToken: farm.quoteToken,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    };
    return row;
  });

  const renderContent = () => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema;

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a, b) => {
          switch (column.name) {
            case "farm":
              return b.id - a.id;
            case "apr":
              if (a.original.apr.value && b.original.apr.value) {
                return (
                  Number(a.original.apr.value) - Number(b.original.apr.value)
                );
              }

              return 0;
            case "earned":
              return a.original.earned.earnings - b.original.earned.earnings;
            default:
              return 1;
          }
        },
        sortable: column.sortable,
      }));

      return (
        <Table
          data={rowData}
          columns={columns}
          userDataReady={userDataReady}
          referrer={referrer}
        />
      );
    }

    return (
      <FlexLayout style={{ margin: "16px 0" }}>
        <Route exact path={`${path}`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              apr={farm.apr}
              sltTokenPrice={sltTokenPrice}
              account={account}
              removed={false}
              referrer={referrer}
            />
          ))}
        </Route>
        <Route exact path={`${path}/history`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              apr={farm.apr}
              sltTokenPrice={sltTokenPrice}
              account={account}
              removed
            />
          ))}
        </Route>
      </FlexLayout>
    );
  };

  return (
    <>
      <PageHeader>
        <Heading
          as="h1"
          scale="xxl"
          color="text"
          mb="16px"
          style={{ userSelect: "none" }}
        >
          SafeFarms
        </Heading>
        <Heading scale="lg" color="text" style={{ userSelect: "none" }}>
          Stake Pancakeswap LP tokens to earn Safe Layer Tokens (SLT)!
        </Heading>
        <Heading color="text" style={{ userSelect: "none" }}>
          The deposit fees are swapped for BUSD, and this BUSD will be used to
          pay dividends on SafeStake and add liquidity to the SLT/BUSD and
          SLT/WBNB pairs on Pancakeswap.
        </Heading>
        {startTimeStamp ? (
          <Flex>
            <TimeCountText
              color={
                startTimeStamp - timeStamp > 0
                  ? "#ffbc00"
                  : endTimeStamp - timeStamp > 0
                  ? "green"
                  : "red"
              }
              mr="16px"
            >
              {startTimeStamp - timeStamp > 0
                ? "Farming Starts in:"
                : endTimeStamp - timeStamp > 0
                ? "Farming is live:"
                : "Farming is over"}
            </TimeCountText>
            {startTimeStamp - timeStamp > 0 ? (
              <TimeCountText color="text">
                {Math.floor((startTimeStamp - timeStamp) / 86400) > 0 &&
                  Math.floor((startTimeStamp - timeStamp) / 86400)}
                {Math.floor((startTimeStamp - timeStamp) / 86400) > 0 && " d: "}
                {Math.floor(((startTimeStamp - timeStamp) % 86400) / 3600)}
                {" h: "}
                {Math.floor(((startTimeStamp - timeStamp) % 3600) / 60)}
                {" m: "}
                {Math.floor(((startTimeStamp - timeStamp) % 3600) % 60)}
                {" s"}
              </TimeCountText>
            ) : endTimeStamp - timeStamp > 0 ? (
              <TimeCountText color="text">
                {Math.floor((endTimeStamp - timeStamp) / 86400) > 0 &&
                  Math.floor((endTimeStamp - timeStamp) / 86400)}
                {Math.floor((endTimeStamp - timeStamp) / 86400) > 0 && " d "}
                {Math.floor(((endTimeStamp - timeStamp) % 86400) / 3600)}
                {" h: "}
                {Math.floor(((endTimeStamp - timeStamp) % 3600) / 60)}
                {" m: "}
                {Math.floor(((endTimeStamp - timeStamp) % 3600) % 60)}
                {" s"}
              </TimeCountText>
            ) : null}
          </Flex>
        ) : (
          <Skeleton width={200} />
        )}
      </PageHeader>
      <Page>
        <ControlContainer>
          <ViewControls>
            <ToggleView
              viewMode={viewMode}
              onToggle={(mode) => setViewMode(mode)}
            />
            <ToggleWrapper>
              <Toggle
                id="staked-only-farms"
                checked={stakedOnly}
                onChange={() => setStakedOnly(!stakedOnly)}
                scale="sm"
              />
              <Text color="text">Staked only</Text>
            </ToggleWrapper>
            <FarmTabButtons
              hasStakeInFinishedFarms={stakedInactiveFarms.length > 0}
            />
          </ViewControls>
        </ControlContainer>
        {renderContent()}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center">
            <Loading />
          </Flex>
        )}
        <div ref={observerRef} />
      </Page>
    </>
  );
};

export default Farms;
