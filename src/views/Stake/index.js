import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import BigNumber from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
import { Heading, Flex, Text } from "@pancakeswap/uikit";
import orderBy from "lodash/orderBy";
import partition from "lodash/partition";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import {
  useFetchPublicStakesData,
  useStakes,
  useFetchUserStakes,
} from "../../store/slices/stake-slice/hooks";
import { usePollFarmsPublicData } from "../../store/slices/farms-slice/hooks";
import { latinise } from "../../utils/latinise";
import FlexLayout from "../../components/Layout/Flex";
import Page from "../../components/Layout/Page";
import PageHeader from "../../components/PageHeader";
import {
  useUserStakeStakedOnly,
  useUserStakesViewMode,
} from "../../store/slices/user-slice/hooks";
import { ViewMode } from "../../store/slices/user-slice/actions";
import Loading from "../../components/Loading";
import StakeCard from "./components/StakeCard";
import StakeTabButtons from "./components/StakeTabButtons";
import StakeTable from "./components/StakeTable/StakeTable";
import { getAprData } from "./helpers";

const CardLayout = styled(FlexLayout)`
  justify-content: center;
`;

const StakeControls = styled.div`
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

const NUMBER_OF_STAKES_VISIBLE = 12;

const Stakes = () => {
  const location = useLocation();
  const { account } = useWeb3React();
  const { stakes, userDataLoaded } = useStakes();
  const [stakedOnly, setStakedOnly] = useUserStakeStakedOnly();
  const [viewMode, setViewMode] = useUserStakesViewMode();
  const [numberOfStakesVisible, setNumberOfStakesVisible] = useState(
    NUMBER_OF_STAKES_VISIBLE
  );
  const { observerRef, isIntersecting } = useIntersectionObserver();
  const [searchQuery] = useState("");
  const [sortOption] = useState("hot");
  const chosenStakesLength = useRef(0);

  const [finishedStakes, openStakes] = useMemo(
    () => partition(stakes, (stake) => stake.isFinished),
    [stakes]
  );
  const stakedOnlyFinishedStakes = useMemo(
    () =>
      finishedStakes.filter((stake) => {
        return (
          stake.userData &&
          new BigNumber(stake.userData.stakedBalance).isGreaterThan(0)
        );
      }),
    [finishedStakes]
  );
  const stakedOnlyOpenStakes = useMemo(
    () =>
      openStakes.filter((stake) => {
        return (
          stake.userData &&
          new BigNumber(stake.userData.stakedBalance).isGreaterThan(0)
        );
      }),
    [openStakes]
  );
  const hasStakeInFinishedStakes = stakedOnlyFinishedStakes.length > 0;

  usePollFarmsPublicData();
  useFetchPublicStakesData();
  useFetchUserStakes(account);

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

  const showFinishedStakes = location.pathname.includes("history");

  const sortStakes = (stakesToSort) => {
    switch (sortOption) {
      case "apr":
        return orderBy(
          stakesToSort,
          (stake) => (stake.apr ? getAprData(stake, 0).apr : 0),
          "desc"
        );
      case "earned":
        return orderBy(
          stakesToSort,
          (stake) => {
            if (!stake.userData || !stake.earningTokenPrice) {
              return 0;
            }
            return stake.userData.pendingReward
              .times(stake.earningTokenPrice)
              .toNumber();
          },
          "desc"
        );
      case "totalStaked":
        return orderBy(
          stakesToSort,
          (stake) => {
            let totalStaked = Number.NaN;
            if (stake.totalStaked?.isFinite()) {
              totalStaked = +formatUnits(
                ethers.BigNumber.from(stake.totalStaked.toString()),
                stake.stakingToken.decimals
              );
            }
            return Number.isFinite(totalStaked) ? totalStaked : 0;
          },
          "desc"
        );
      default:
        return stakesToSort;
    }
  };

  let chosenStakes;
  if (showFinishedStakes) {
    chosenStakes = stakedOnly ? stakedOnlyFinishedStakes : finishedStakes;
  } else {
    chosenStakes = stakedOnly ? stakedOnlyOpenStakes : openStakes;
  }

  if (searchQuery) {
    const lowercaseQuery = latinise(searchQuery.toLowerCase());
    chosenStakes = chosenStakes.filter((stake) =>
      latinise(stake.earningToken.symbol.toLowerCase()).includes(lowercaseQuery)
    );
  }

  chosenStakes = sortStakes(chosenStakes).slice(0, numberOfStakesVisible);
  chosenStakesLength.current = chosenStakes.length;

  const cardLayout = (
    <CardLayout>
      {chosenStakes.map((stake) => (
        <StakeCard key={stake.sousId} stake={stake} account={account} />
      ))}
    </CardLayout>
  );

  const tableLayout = (
    <StakeTable
      stakes={chosenStakes}
      account={account}
      userDataLoaded={userDataLoaded}
    />
  );

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
          SafeStake
        </Heading>
        <Heading scale="lg" color="text" style={{ userSelect: "none" }}>
          Stake your Safe Layer Tokens (SLT) to earn BUSD for the whole Layer
          Cycle!
        </Heading>
        <Heading color="text" style={{ userSelect: "none" }}>
          At the end of each layer, you will be able to transit to the next
          layer, allowing for a potentially endless amount of layers offering;
          high but stable, sustainable and predictable profits.
        </Heading>
      </PageHeader>
      <Page>
        <StakeControls>
          <StakeTabButtons
            stakedOnly={stakedOnly}
            setStakedOnly={setStakedOnly}
            hasStakeInFinishedStakes={hasStakeInFinishedStakes}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </StakeControls>
        {showFinishedStakes && (
          <Text fontSize="20px" color="#ED4B9E" pb="32px" textAlign="center">
            These stake are no longer distributing rewards. Please unstake your
            tokens.
          </Text>
        )}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center" mb="4px">
            <Loading />
          </Flex>
        )}
        {viewMode === ViewMode.CARD ? cardLayout : tableLayout}
        <div ref={observerRef} />
      </Page>
    </>
  );
};

export default Stakes;
