import { useEffect, useCallback, useState, useMemo, useRef } from "react";
import { Route, useRouteMatch, useLocation } from "react-router-dom";
import BigNumber from "bignumber.js";
import { Heading, Toggle, Text, Flex, Skeleton } from "@pancakeswap/uikit";
import styled from "styled-components";
import FlexLayout from "../../components/Layout/Flex";
import Page from "../../components/Layout/Page";
import {
  usePools,
  usePollPoolsWithUserData,
} from "../../store/slices/pools-slice/hooks";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { getBalanceNumber } from "../../utils/formatBalance";
import { latinise } from "../../utils/latinise";
import { isAddress } from "../../utils/addressHelpers";
import { useSelector } from "react-redux";
import {
  useUserPoolStakedOnly,
  useUserPoolsViewMode,
} from "../../store/slices/user-slice/hooks";
import { ViewMode } from "../../store/slices/user-slice/actions";
import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";
import PoolCard from "./components/PoolCard/PoolCard";
import Table from "./components/PoolTable/PoolTable";
import PoolTabButtons from "./components/PoolTabButtons";
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

const NUMBER_OF_STAKES_VISIBLE = 12;

const Stakes = () => {
  const { path } = useRouteMatch();
  const { pathname, search } = useLocation();
  let referrer = AddressZero;
  if (search.slice(5) && isAddress(atob(search.slice(5)))) {
    referrer = atob(search.slice(5));
  }
  const { data: stakesData, userDataLoaded } = usePools();
  const { account, library } = useActiveWeb3React();
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
  const [viewMode, setViewMode] = useUserPoolsViewMode();
  const { observerRef, isIntersecting } = useIntersectionObserver();
  const chosenStakesLength = useRef(0);

  const isInactive = pathname.includes("history");
  const isActive = !isInactive;

  usePollPoolsWithUserData();

  const userDataReady = !account || (!!account && userDataLoaded);

  const [stakedOnly, setStakedOnly] = useUserPoolStakedOnly(isActive);
  const activeStakes = stakesData.filter(
    (stake) => stake.multiplier !== "0X" && stake.pid !== 2
  );
  const inactiveStakes = stakesData.filter(
    (stake) => stake.multiplier === "0X" && stake.pid !== 2
  );
  const stakedOnlyStakes = activeStakes.filter(
    (stake) =>
      stake.userData &&
      new BigNumber(stake.userData.stakedBalance).isGreaterThan(0)
  );

  const stakedInactiveStakes = inactiveStakes.filter(
    (stake) =>
      stake.userData &&
      new BigNumber(stake.userData.stakedBalance).isGreaterThan(0)
  );

  const stakesList = useCallback(
    (stakesToDisplay) => {
      let stakesToDisplayWithAPR = stakesToDisplay.map((stake) => {
        return stake;
      });

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase());
        stakesToDisplayWithAPR = stakesToDisplayWithAPR.filter((stake) => {
          return latinise(stake.stakeSymbol.toLowerCase()).includes(
            lowercaseQuery
          );
        });
      }
      return stakesToDisplayWithAPR;
    },
    [query]
  );

  const [numberOfStakesVisible, setNumberOfStakesVisible] = useState(
    NUMBER_OF_STAKES_VISIBLE
  );

  const chosenStakesMemoized = useMemo(() => {
    let chosenStakes = [];

    if (isActive) {
      chosenStakes = stakedOnly
        ? stakesList(stakedOnlyStakes)
        : stakesList(activeStakes);
    }
    if (isInactive) {
      chosenStakes = stakedOnly
        ? stakesList(stakedInactiveStakes)
        : stakesList(inactiveStakes);
    }
    return chosenStakes.slice(0, numberOfStakesVisible);
  }, [
    activeStakes,
    stakesList,
    inactiveStakes,
    isActive,
    isInactive,
    stakedInactiveStakes,
    stakedOnly,
    stakedOnlyStakes,
    numberOfStakesVisible,
  ]);

  chosenStakesLength.current = chosenStakesMemoized.length;

  useEffect(() => {
    if (isIntersecting) {
      setNumberOfStakesVisible((stakesCurrentlyVisible) => {
        if (stakesCurrentlyVisible <= chosenStakesLength.current) {
          return stakesCurrentlyVisible + NUMBER_OF_STAKES_VISIBLE;
        }
        return stakesCurrentlyVisible;
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

  const rowData = chosenStakesMemoized.map((stake) => {
    const { token } = stake;
    const tokenAddress = token.address;
    const stakeLabel =
      stake.stakeSymbol &&
      stake.stakeSymbol.split(" ")[0].toUpperCase().replace("PANCAKE", "");

    const row = {
      apr: {
        pid: stake.pid,
        multiplier: stake.multiplier,
        stakeLabel,
        stakeSymbol: stake.stakeSymbol,
        tokenAddress,
        sltTokenPrice,
        originalValue: stake.apr,
      },
      stake: {
        label: stakeLabel,
        pid: stake.pid,
        token: stake.token,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(stake.userData.earnings)),
        pid: stake.pid,
      },
      liquidity: {
        liquidity: stake.liquidity,
      },
      multiplier: {
        multiplier: stake.multiplier,
      },
      details: stake,
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
            case "stake":
              return b.id - a.id;
            case "apr":
              if (
                a.original.apr.originalValue &&
                b.original.apr.originalValue
              ) {
                return (
                  Number(a.original.apr.originalValue) -
                  Number(b.original.apr.originalValue)
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
          {chosenStakesMemoized.map((stake) => (
            <PoolCard
              key={stake.pid}
              stake={stake}
              sltTokenPrice={sltTokenPrice}
              account={account}
              removed={false}
              referrer={referrer}
            />
          ))}
        </Route>
        <Route exact path={`${path}/history`}>
          {chosenStakesMemoized.map((stake) => (
            <PoolCard
              key={stake.pid}
              stake={stake}
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
          SafePools
        </Heading>
        <Heading scale="lg" color="text" style={{ userSelect: "none" }}>
          Stake single token asset to earn Safe Layer Tokens (SLT)!
        </Heading>
        <Heading color="text" style={{ userSelect: "none" }}>
          The deposit fees are swapped to BUSD and used for pay-out dividends on
          SafeStake and will also add liquidity to the SLT/BUSD and SLT/WBNB
          pairs on Pancakeswap.
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
                ? "Pools Starts in:"
                : endTimeStamp - timeStamp > 0
                ? "Pools is live:"
                : "Pools is over"}
            </TimeCountText>
            {startTimeStamp - timeStamp > 0 ? (
              <TimeCountText color="text">
                {Math.floor((startTimeStamp - timeStamp) / 86400) > 0 &&
                  Math.floor((startTimeStamp - timeStamp) / 86400)}
                {Math.floor((startTimeStamp - timeStamp) / 86400) > 0 && " d "}
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
                {" hours: "}
                {Math.floor(((endTimeStamp - timeStamp) % 3600) / 60)}
                {" minutes: "}
                {Math.floor(((endTimeStamp - timeStamp) % 3600) % 60)}
                {" seconds"}
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
                id="staked-only-stakes"
                checked={stakedOnly}
                onChange={() => setStakedOnly(!stakedOnly)}
                scale="sm"
              />
              <Text color="text">Staked only</Text>
            </ToggleWrapper>
            <PoolTabButtons
              hasStakeInFinishedStakes={stakedInactiveStakes.length > 0}
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

export default Stakes;
